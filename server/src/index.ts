import mongoose from 'mongoose';
import { startDockerContainer, stopDockerContainer } from 'database';
import { app } from './server.js';

const container = await startDockerContainer(process.env.CONTAINER_NAME);

mongoose.connect('mongodb://0.0.0.0:27107/');

const server = app.listen(8080, () => {
    console.log('Server running at http://localhost:8080');
});

let stopping = false;

process.on('SIGINT', async () => {
    if (stopping) return;
    stopping = true;

    console.log('Stopping server...');
    server.close();
    await stopDockerContainer(container);

    console.log('Done');
    process.exit();
});
