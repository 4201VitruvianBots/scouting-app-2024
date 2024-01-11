import { startDockerContainer, stopDockerContainer } from 'database';
import { app } from './server.js';


const container = await startDockerContainer('socal-db');

async function connectDatabase () {
    await mongoose.connect('mongodb://127.0.0.1:27017');
}

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
