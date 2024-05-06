import chalk from 'chalk'
import Docker from 'dockerode';
import dotenv from 'dotenv-mono';
dotenv.load();

const docker = new Docker();

function buildDockerImage() {
    console.log(chalk.blue('Building docker image...\n'));
    docker.buildImage(
        {
            src: ['Dockerfile'],
            context: '.',
        },
        { t: process.env.IMAGE_NAME },
        (err, stream) => {
            if (err) {
                console.error(chalk.red('Error building Docker image:'), err);
                return;
            }

            // Print build process
            stream.on('data', chunk => {
                try {
                    process.stdout.write(chalk.gray(JSON.parse(chunk)?.stream ?? ''));
                } catch (e) {
                    /* empty */
                }
            });

            stream.on('end', () => {
                console.log(chalk.blue('Docker image build complete.'));
            });
        }
    );
}

export { buildDockerImage };
