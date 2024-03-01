import { startDockerContainer } from 'database';
import mongoose from 'mongoose';
import { matchApp, superApp } from '../src/Schema.js';
import { MatchData, SuperData } from 'requests';

function randint(max: number, min = 0) {
    return Math.floor((max - min) * Math.random()) + min;
}

function choose<T>(array: T[]) {
    return array[randint(array.length)];
}

await startDockerContainer(process.env.CONTAINER_NAME);
await mongoose.connect('mongodb://0.0.0.0:27017/');

const teams = new Array(50).fill(0).map(() => Math.floor(10000 * Math.random()));

for (let matchNumber = 1; matchNumber < 400; matchNumber++) {
    for (const robotPosition of ['red_1', 'red_2', 'red_3', 'blue_1', 'blue_2', 'blue_3'] as const) {
        console.log(matchNumber);
        await new matchApp({
            autoNotes: {
                far: randint(10),
                mid: randint(10),
                near: randint(10),
                amp: randint(10),
                miss: randint(10)
            },
            climb: choose(['amp', 'center', 'failed', 'none', 'park', 'source']),
            leftStartingZone: Math.random() > 0.5,
            metadata: {
                robotPosition,
                robotTeam: choose(teams),
                scouterName: 'Jim',
                matchNumber: matchNumber,
            },
            teleNotes: {
                far: randint(10),
                mid: randint(10),
                near: randint(10),
                amp: randint(10),
                miss: randint(10)
            },
        
            trapNotes: randint(2),
        } satisfies MatchData).save()
    }
}

for (let matchNumber = 1; matchNumber < 400; matchNumber++) {
    for (const robotPosition of ['red_1', 'red_2', 'red_3', 'blue_1', 'blue_2', 'blue_3'] as const) {
        console.log(matchNumber);
        await new superApp({
            metadata: {
                robotPosition,
                robotTeam: choose(teams),
                scouterName: 'Jim',
                matchNumber: matchNumber,
            },
            fouls: {
                inBot: randint(10),
                damageBot: randint(10),
                tipEntangBot: randint(10),
                pinBot: randint(10),
                podiumFoul: randint(10),
                zoneFoul: randint(10),
                stageFoul: randint(10),
                overExtChute: randint(10)
            },
            defense: choose(['fullDef', 'someDef', 'noDef']),
            defended: Math.random() > 0.5,
            humanShooter: {
                highNotes: {
                    amp: Math.random() > 0.5,
                    source: Math.random() > 0.5,
                    center: Math.random() > 0.5
                }
            }
        } satisfies SuperData).save()
    }
}

await mongoose.disconnect();
