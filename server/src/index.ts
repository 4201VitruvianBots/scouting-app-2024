import { startDockerContainer, stopDockerContainer } from 'database';

console.log('hello world');

const container = await startDockerContainer('socal-db');
stopDockerContainer(container);
console.log('Done');
