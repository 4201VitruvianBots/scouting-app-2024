import { Application } from 'express';
import expressWs from 'express-ws'
import { StatusRecieve, StatusReport } from 'requests';

const status: StatusRecieve = { matches: [], scouters: [] };

// array of functions to call whenever status changes;
const statusWatchers: (() => void)[] = [];

// run all watchers, should be called whenever status is updated
function notifyWatchers() {
    statusWatchers.forEach(watcher => watcher());
}

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
        status.scouters.push(scouter)
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
            status.scouters.splice(status.scouters.indexOf(scouter));
            notifyWatchers();
        });
    });

    app.ws('/status/admin', (ws, _req) => {
        // Send an update
        const sendUpdate = () => {
            ws.send(JSON.stringify(status))
        }

        sendUpdate();

        // Send updates whenever it changes
        statusWatchers.push(sendUpdate);

        // When the socket closes remove the listeners
        ws.on('close', () => {
            statusWatchers.splice(statusWatchers.indexOf(sendUpdate), 1);
        });
    })
};

export {setUpSocket};
