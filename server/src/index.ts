import mongoose from 'mongoose';
import { startDockerContainer, stopDockerContainer } from 'database';
import { app } from './server.js';



const container = await startDockerContainer('socal-db');

mongoose.connect('mongodb+srv://bestUsername:bestPassword23@cluster0.hr4gmev.mongodb.net/');

const server = app.listen(8080, () => {
    console.log('Server running on port 8080');
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
