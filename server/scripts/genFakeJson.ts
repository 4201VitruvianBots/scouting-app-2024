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

const teams: number[] = [];

function getTeamNum() {
    let num: number;
    do {
        num = randint(10000);
    } while (num in teams);
    teams.push(num);
    return num;
}

const data = new Array(40).fill(0).map(() => (
    {
        teamNumber: getTeamNum(),
        scouterName: 'Nate',
        autoAmpNotes: randint(5),
        autoSpeakerNear: randint(5),
        autoSpeakerMid: randint(5),
        autoSpeakerFar: randint(5),
        climb: choose(['amp', 'center', 'failed', 'none', 'park', 'source']),
        highNotes: randint(5),
        leftStartingZone: Math.random() > 0.5,
        teleAmpedSpeakerFar: randint(5),
        teleAmpedSpeakerMid: randint(5),
        teleAmpedSpeakerNear: randint(5),
        teleAmpNotes: randint(5),
        teleNonAmpedSpeakerFar: randint(5),
        teleNonAmpedSpeakerMid: randint(5),
        teleNonAmpedSpeakerNear: randint(5),
        trapNotes: randint(2),
    }
));

fs.writeFileSync('static/output_analysis.json', JSON.stringify(data));
