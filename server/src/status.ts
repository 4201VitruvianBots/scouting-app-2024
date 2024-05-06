import { Application } from 'express';
import expressWs from 'express-ws';
import {
    MatchSchedule,
    StatusRecieve,
    StatusReport,
    RobotPosition,
    SuperPosition,
} from 'requests';
import { matchApp, superApp } from './Schema.js';
import fs from 'fs';

const bluePositions: RobotPosition[] = ['blue_1', 'blue_2', 'blue_3'];
const redPositions: RobotPosition[] = ['red_1', 'red_2', 'red_3'];

const scheduleFile = '../client/src/assets/matchSchedule.json';

const schedule = fs.existsSync(scheduleFile)
    ? (JSON.parse(
          fs.readFileSync(scheduleFile, { encoding: 'utf8' })
      ) as MatchSchedule)
    : undefined;

const status: StatusRecieve = { matches: {}, scouters: [] };

// array of functions to call whenever status changes;
const statusWatchers: (() => void)[] = [];

// run all watchers, should be called whenever status is updated
function notifyWatchers() {
    statusWatchers.forEach(watcher => watcher());
}

async function updateMatchStatus() {
    const matchEntries = await matchApp
        .find()
        .select(
            'metadata.matchNumber metadata.robotTeam metadata.robotPosition'
        );
    const superEntries = await superApp
        .find()
        .select('metadata.matchNumber metadata.robotPosition');

    const matchNumbers = [
        ...[...Object.keys(schedule ?? {})].map(number => parseInt(number)),
        ...matchEntries.map(match => match.metadata.matchNumber),
    ].filter((value, index, self) => self.indexOf(value) === index);

    const matchOutput = Object.fromEntries(
        matchNumbers.map(matchNumber => [
            matchNumber,
            {
                // Normal scouters
                ...Object.fromEntries(
                    (
                        [
                            'red_1',
                            'red_2',
                            'red_3',
                            'blue_1',
                            'blue_2',
                            'blue_3',
                        ] satisfies RobotPosition[]
                    ).map(robotPosition => [
                        robotPosition,
                        {
                            schedule: schedule?.[matchNumber]?.[robotPosition],
                            real: matchEntries
                                .filter(
                                    matchEntry =>
                                        matchEntry.metadata.matchNumber ===
                                            matchNumber &&
                                        matchEntry.metadata.robotPosition ===
                                            robotPosition
                                )
                                .map(
                                    matchEntry => matchEntry.metadata.robotTeam
                                ),
                        },
                    ])
                ),
                // Super scouters
                ...Object.fromEntries(
                    (['red_ss', 'blue_ss'] satisfies SuperPosition[]).map(
                        superPosition => [
                            superPosition,
                            superEntries.some(
                                entry =>
                                    entry.metadata.matchNumber ===
                                        matchNumber &&
                                    (superPosition === 'blue_ss'
                                        ? bluePositions
                                        : redPositions
                                    ).includes(entry.metadata.robotPosition)
                            ),
                        ]
                    )
                ),
            },
        ])
    );

    status.matches = matchOutput as unknown as StatusRecieve['matches'];
    notifyWatchers();
}

updateMatchStatus();

function setUpSocket(expressApp: Application) {
    const { app } = expressWs(expressApp);

    app.ws('/status/scouter', (ws, _req) => {
        // Create an object to hold the scouter info
        const scouter: StatusReport = {
            battery: undefined,
            matchNumber: undefined,
            robotPosition: undefined,
            scouterName: '',
        };

        // put the scouter into the list of scouters
        status.scouters.push(scouter);
        notifyWatchers();

        // When new data is recieved
        ws.on('message', (msg: string) => {
            // Update `scouter` with all the new data
            Object.assign(scouter, JSON.parse(msg));
            notifyWatchers();
        });

        // When the websocket closes
        ws.on('close', () => {
            // Remove this scouter from the list
            status.scouters.splice(status.scouters.indexOf(scouter), 1);
            notifyWatchers();
        });
    });

    app.ws('/status/admin', (ws, _req) => {
        // Function to send an update
        const sendUpdate = () => {
            ws.send(JSON.stringify(status));
        };

        // Send immediately
        sendUpdate();

        // Send updates whenever it changes
        statusWatchers.push(sendUpdate);

        // When the socket closes
        ws.on('close', () => {
            // Remove from the array of watchers
            statusWatchers.splice(statusWatchers.indexOf(sendUpdate), 1);
        });
    });
}

export { setUpSocket, updateMatchStatus };
