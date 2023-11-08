import Docker from 'dockerode';
import 'dotenv/config';

const docker = new Docker();

async function buildDockerImage() {
    console.log('Building docker image...\n');
    await docker.buildImage(
        {
            src: ['Dockerfile'],
            context: '.',
        },
        { t: process.env.IMAGE_NAME },
        (err, stream) => {
            if (err) {
                console.error('Error building Docker image:', err);
                return;
            }

            // Print build process
            stream.on('data', chunk => {
                process.stdout.write(JSON.parse(chunk)?.stream ?? '');
            });

            stream.on('end', () => {
                console.log('Docker image build complete.');
            });
        }
    );
}

export { buildDockerImage };
