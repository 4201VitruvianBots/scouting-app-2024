import { startDockerContainer, stopDockerContainer } from 'database';

const container = await startDockerContainer('socal-db');
await stopDockerContainer(container);
console.log('Done');
