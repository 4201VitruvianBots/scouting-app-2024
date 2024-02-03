import fs from 'fs';

function randint(max: number, min = 0) {
    return Math.floor(randfloat(max, min));
}

function choose<T>(array: T[]) {
    return array[randint(array.length)];
}

function randfloat(max: number, min = 0) {
    return (max - min) * Math.random() + min;
}

const teams = new Array(40).fill(0).map(() => Math.floor(10000 * Math.random()));

const data = new Array(40).fill(0).map(() => (
    {
        robotPosition: choose(['blue_1', 'blue_2', 'blue_3', 'red_1', 'red_2', 'red_3']),
        teamNumber: choose(teams),
        scouterName: 'Jim',
        autoAmpNotes: randint(5),
        autoSpeakerNear: randint(5),
        autoSpeakerMid: randint(5),
        utoSpeakerFar: randint(5),
        climb: choose(['amp', 'center', 'failed', 'none', 'park', 'source']),
        highNotes: randint(5),
        leftStartingZone: Math.random() > 0.5,
        teleAmpedSpeakerfar: randint(5),
        teleAmpedSpeakermid: randint(5),
        teleAmpedSpeakernear: randint(5),
        teleAmpNotes: randint(5),
        teleNonAmpedSpeakerFar: randint(5),
        teleNonAmpedSpeakerMid: randint(5),
        teleNonAmpedSpeakerNear: randint(5),
        trapNotes: randint(2),
    }
));

fs.writeFileSync('static/output_analysis.json', JSON.stringify(data));
