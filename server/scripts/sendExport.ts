import mongoose from 'mongoose';
import { sendExport } from '../src/transfer';
import * as dotenv from 'dotenv-mono';
import { startDockerContainer } from 'database';

dotenv.load({ path: '.env' });
dotenv.load({ path: '.env.local' });

await startDockerContainer(process.env.CONTAINER_NAME);
await mongoose.connect('mongodb://0.0.0.0:27107/');

console.log('Sending to remote server...')

await sendExport();

console.log('Finished')

await mongoose.disconnect();
