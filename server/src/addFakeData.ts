import { startDockerContainer } from 'database';
import mongoose from 'mongoose';
import { matchApp } from './Schema.js';
import { MatchData } from 'requests';

function randint(max: number, min = 0) {
    return Math.floor((max - min) * Math.random()) + min;
}

function choose<T>(array: T[]) {
    return array[randint(array.length)];
}

await startDockerContainer(process.env.CONTAINER_NAME);
await mongoose.connect('mongodb://0.0.0.0:27017/');

const teams = new Array(40).fill(0).map(() => Math.floor(10000 * Math.random()));

for (let i = 0; i < 40; i++) {
    console.log(i);
    await new matchApp({
        autoAmpNotes: randint(5),
        autoSpeakerNotes: {
            near: randint(5),
            mid: randint(5),
            far: randint(5),
        },
        climb: choose(['amp', 'center', 'failed', 'none', 'park', 'source']),
        highNotes: randint(5),
        leftStartingZone: Math.random() > 0.5,
        metadata: {
            robotPosition: choose(['blue_1', 'blue_2', 'blue_3', 'red_1', 'red_2', 'red_3']),
            robotTeam: choose(teams),
            scouterName: 'Jim',
        },
        teleAmpedSpeakerNotes: {
            far: randint(5),
            mid: randint(5),
            near: randint(5),
        },
        teleAmpNotes: randint(5),
        teleNonAmpedSpeakerNotes: {
            far: randint(5),
            mid: randint(5),
            near: randint(5),
        },
        trapNotes: randint(2),
    } satisfies MatchData).save()
}

await mongoose.disconnect();
