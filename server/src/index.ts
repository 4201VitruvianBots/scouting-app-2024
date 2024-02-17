import mongoose from 'mongoose';
import ngrok from 'ngrok';
import dotenv from 'dotenv-mono';
import { startDockerContainer, stopDockerContainer } from 'database';
import { app } from './server.js';

dotenv.load({ path: '.env' });
dotenv.load({ path: '.env.local' });

const remote = process.env.LOCATION === 'remote';

const container = await startDockerContainer(process.env.CONTAINER_NAME);

mongoose.connect('mongodb://0.0.0.0:27107/');

const server = app.listen(8080, () => {
    console.log('Server running at http://localhost:8080');
});

if (remote) {
    const url = await ngrok.connect({ authtoken: process.env.NGROK_TOKEN, addr: 8080 });
    console.log(`Server is accessible at ${url}`);
}

let stopping = false;

const handleExit = async () => {
    if (stopping) return;
    stopping = true;

    console.log('Stopping server...');

    server.close();

    await stopDockerContainer(container);

    console.log('Done');

    process.exit();
}

process.on('SIGINT', handleExit);
process.on('SIGTERM', handleExit);
