import { Application } from 'express';
import expressWs from 'express-ws'
import { Ref } from './lib/Ref.js';
import { StatusRecieve, StatusReport } from 'requests';

const scouters = new Ref<StatusRecieve['scouters']>([]);
const matches = new Ref<StatusRecieve['matches']>([]);

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
        scouters.value.push(scouter)
        scouters.triggerUpdate();

        // When new data is recieved
        ws.on('message', (msg: string) => {
            // Update `scouter` with all the new data
            Object.assign(scouter, JSON.parse(msg));
            scouters.triggerUpdate();
        });

        // When the websocket closes
        ws.on('close', () => {
            // Remove this scouter from the list
            scouters.value.splice(scouters.value.indexOf(scouter));
            scouters.triggerUpdate();
        });
    });

    app.ws('/status/admin', (ws, _req) => {
        // Send an update
        const sendUpdate = () => {
            ws.send(JSON.stringify({
                matches: matches.value,
                scouters: scouters.value
            } satisfies StatusRecieve))
        }

        sendUpdate();

        // Send updates whenever one of these changes
        matches.on('change', sendUpdate);
        scouters.on('change', sendUpdate);

        // When the socket closes remove the listeners
        ws.on('close', () => {
            matches.off('change', sendUpdate);
            scouters.off('change', sendUpdate);
        });
    })
};

export {setUpSocket};
