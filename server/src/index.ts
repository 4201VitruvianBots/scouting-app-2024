import { startDockerContainer, stopDockerContainer } from 'database';

// If DEV is true then the app should forward requests to localhost:5173 instead of serving from /static
const DEV = process.env.NODE_ENV === 'dev';

const container = await startDockerContainer('socal-db');
console.log(DEV ? 'Developemnt' : 'Production');
await stopDockerContainer(container);
console.log('Done');
