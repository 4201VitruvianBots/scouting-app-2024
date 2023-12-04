import { startDockerContainer, stopDockerContainer } from 'database';
import { app } from './server.js';

const container = await startDockerContainer('socal-db');
const server = app.listen(8080, () => {
    console.log('Server running on port 8080');
});
process.on('SIGINT', async () => {
    console.log('stopping server...');
    server.close();

    await stopDockerContainer(container);
    console.log('Done');
    process.exit();
});
