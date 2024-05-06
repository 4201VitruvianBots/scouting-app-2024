import chalk from 'chalk';
import Docker from 'dockerode';
import dotenv from 'dotenv-mono';
dotenv.load();

const docker = new Docker();

async function startDockerContainer(containerName) {
    // Check if the container with the given name exists
    let containers;

    try {
        containers = await docker.listContainers({ all: true });
    } catch (e) {
        console.error(
            chalk.red('\nDocker operation failed, is Docker running?\n')
        );
        console.error(e);
        process.exit(1);
    }
    const existingContainer = containerName
        ? containers.find(containerInfo => {
              return containerInfo.Names.includes('/' + containerName);
          })
        : undefined;

    let container;

    if (existingContainer) {
        console.log(
            chalk.blue(
                `Container "${containerName}" already exists. Starting it...`
            )
        );
        container = docker.getContainer(existingContainer.Id);
    } else {
        if (containerName) {
            console.log(
                chalk.gray(`Container "${containerName}" does not exist.`)
            );
        }
        console.log(chalk.blue('Creating and starting a new container...'));
        container = await docker.createContainer({
            Image: process.env.IMAGE_NAME, // You can specify a different image if needed
            name: containerName, // Set Name to undefined for an unnamed container
            HostConfig: {
                PortBindings: {
                    '27017/tcp': [{ HostPort: '27017' }],
                },
            },
        });
    }

    if ((await container.inspect()).State.Running) {
        console.log(chalk.gray('Container already running'));
    } else {
        await container.start();
        console.log(chalk.green('Started container'));
    }
    return container;
}

export { startDockerContainer };
