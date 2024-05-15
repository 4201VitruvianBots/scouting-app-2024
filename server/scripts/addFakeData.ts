import { startDockerContainer } from 'database';
import mongoose from 'mongoose';
import { matchApp, superApp } from '../src/Schema.js';
import { CommentValues, MatchData, SuperData } from 'requests';
import { dotenvLoad } from 'dotenv-mono';

function randint(max: number, min = 0) {
    return Math.floor((max - min) * Math.random()) + min;
}

function choose<T>(array: T[]) {
    return array[randint(array.length)];
}

await startDockerContainer(process.env.CONTAINER_NAME);
await mongoose.connect('mongodb://0.0.0.0:27017/');

const comments: CommentValues[] = [
    'great_driving',
    'good_driving',
    'source_only',
    'clogging',
    'effective_defense',
    'okay_defense',
    'ineffective_defense',
    'sturdy_build',
    'weak_build',
    'avoids_under_stage',
];

dotenvLoad({ path: '.env' });
dotenvLoad({ path: '.env.local' });

const apiKey = process.env.API_KEY!;
const eventKey = process.env.EVENT_KEY!;
console.log(apiKey);

interface SimpleTeam {
    key: string;
    team_number: number;
    nickname?: string;
    name: string;
    city?: string;
    state_prov?: string;
    country?: string;
}

const result = await fetch(
    `https://www.thebluealliance.com/api/v3/event/${eventKey}/teams/simple`,
    {
        headers: {
            'X-TBA-Auth-Key': apiKey,
        },
    }
);

console.log(result.status);

const data = (await result.json()) as SimpleTeam[];
console.log(data);
const teams = data.map(e => e.team_number).sort((a, b) => a - b);
console.log(teams);

for (let matchNumber = 1; matchNumber < 400; matchNumber++) {
    for (const robotPosition of [
        'red_1',
        'red_2',
        'red_3',
        'blue_1',
        'blue_2',
        'blue_3',
    ] as const) {
        console.log(matchNumber);
        const team = choose(teams);
        await new matchApp({
            autoNotes: {
                far: randint(5),
                mid: randint(5),
                near: randint(5),
                amp: randint(5),
                miss: randint(5),
            },
            climb: choose([
                'amp',
                'center',
                'failed',
                'none',
                'park',
                'source',
            ]),
            leftStartingZone: Math.random() > 0.5,
            metadata: {
                robotPosition,
                robotTeam: team,
                scouterName: 'Jim',
                matchNumber: matchNumber,
            },
            teleNotes: {
                far: randint(10),
                mid: randint(10),
                near: randint(10),
                amp: randint(10),
                miss: randint(10),
            },

            trapNotes: randint(2),
        } satisfies MatchData).save();

        await new superApp({
            metadata: {
                robotPosition,
                scouterName: 'Jim',
                robotTeam: team,
                matchNumber: matchNumber,
            },
            fouls: {
                insideRobot: randint(2),
                protectedZone: randint(2),
                multiplePieces: randint(2),
                other: randint(2),
                pinning: randint(2),
            },
            break: {
                batteryFall: randint(2),
                commsFail: randint(2),
                mechanismDmg: randint(2),
            },
            defense: choose(['fullDef', 'someDef', 'noDef']),
            defended: Math.random() > 0.5,
            comments: comments.filter(() => randint(4) === 0),
            humanShooter:
                randint(3) === 0
                    ? {
                          highNotes: {
                              amp: Math.random() > 0.5,
                              source: Math.random() > 0.5,
                              center: Math.random() > 0.5,
                          },
                      }
                    : undefined,
        } satisfies SuperData).save();
    }
}

await mongoose.disconnect();
