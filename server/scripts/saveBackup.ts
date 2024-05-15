import { startDockerContainer } from 'database';
import mongoose from 'mongoose';
import { exportAllData } from '../src/transfer';
import fs from 'fs';

await startDockerContainer(process.env.CONTAINER_NAME);
await mongoose.connect('mongodb://0.0.0.0:27107/');

fs.writeFileSync(
    'static/backup.json',
    JSON.stringify(await exportAllData(), null, 4)
);

await mongoose.disconnect();
