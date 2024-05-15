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

const teams: number[] = `4
498
696
973
980
1148
1159
1165
1197
1572
2102
2429
2485
2543
2658
2710
2839
3128
3255
3328
3473
3512
3647
3759
3863
4201
4322
4414
4415
4481
4501
5124
5137
5199
5419
6036
6658
6764
7157
7777
8006
8020
8119
8891
9408
9452
9505
9520
9538
9635`
    .split('\n')
    .map(str => parseInt(str));

const data = teams.map(team => ({
    teamNumber: team,
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
    Comments: {
        great_driving: randint(5),
        good_driving: randint(5),
        source_only: randint(5),
        clogging: randint(5),
        effective_defense: randint(5),
        okay_defense: randint(5),
        ineffective_defense: randint(5),
        sturdy_build: randint(5),
        weak_build: randint(5),
        avoids_under_stage: randint(5),
    },
}));

fs.writeFileSync('static/output_analysis.json', JSON.stringify(data));
