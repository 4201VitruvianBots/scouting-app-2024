import { matchApp } from './Schema.js';
import { InferSchemaType } from 'mongoose';

async function exportAllData() {
    return {
        matchApp: await matchApp.find({}),
    }
}

function importAllData(data: { matchApp: InferSchemaType<typeof matchApp>[] }) {
    matchApp.create(data.matchApp)
}

export { exportAllData, importAllData }
