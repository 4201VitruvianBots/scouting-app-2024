import { matchApp, matchDataSchema } from './Schema.js';
import { InferSchemaType } from 'mongoose';


async function exportAllData() {
    return {
        matchApp: await matchApp.find({}),
    }
}

async function sendExport() {
    const REMOTE_SERVER = process.env.REMOTE_SERVER_URL;

    if (!REMOTE_SERVER) {
        console.error('No remote server to send to');
        return;
    }

    return await fetch(`${REMOTE_SERVER}/data/sync`, {
        method: 'POST',
        body: JSON.stringify(exportAllData()),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

async function importAllData(data: { matchApp: InferSchemaType<typeof matchDataSchema>[] }) {
    await matchApp.create(data.matchApp)
}

export { exportAllData, importAllData, sendExport }
