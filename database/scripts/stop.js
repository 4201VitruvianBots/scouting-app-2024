import chalk from 'chalk';

async function stopDockerContainer(container) {
    console.log(chalk.blue('Stopping container...'));
    await container.stop();
    console.log(chalk.green('Stopped container'));
}

export { stopDockerContainer };
