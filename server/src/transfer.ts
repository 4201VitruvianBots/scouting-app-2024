import { MatchData } from 'requests';
import { matchApp } from './Schema.js';

async function exportAllData() {
    return {
        matchApp: await matchApp.find({}) satisfies MatchData[],
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
        body: JSON.stringify(await exportAllData()),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}


function scheduleExport() {
    setInterval(sendExport, 60 * 1000 * 5);
}

async function importAllData(data: { matchApp: MatchData[] }) {
    await matchApp.deleteMany();
    await matchApp.insertMany(data.matchApp);
}

export { exportAllData, importAllData, sendExport, scheduleExport }
