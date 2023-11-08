import Docker from 'dockerode';
import 'dotenv/config';

const docker = new Docker();

async function startDockerContainer(containerName) {
    // Check if the container with the given name exists
    const containers = await docker.listContainers({ all: true });
    const existingContainer = containerName
        ? containers.find(containerInfo => {
              return containerInfo.Names.includes('/' + containerName);
          })
        : undefined;

    let container;

    if (existingContainer) {
        console.log(
            `Container "${containerName}" already exists. Starting it...`
        );
        container = docker.getContainer(existingContainer.Id);
    } else {
        if (containerName) {
            console.log(`Container "${containerName}" does not exist.`);
        }
        console.log('Creating and starting a new container...');
        container = await docker.createContainer({
            Image: process.env.IMAGE_NAME, // You can specify a different image if needed
            name: containerName, // Set Name to undefined for an unnamed container
            HostConfig: {
                PortBindings: {
                    '27017/tcp': [{ HostPort: '27107' }],
                },
            },
        });
    }

    await container.start();
    console.log('Started container');
    return container;
}

export { startDockerContainer };
