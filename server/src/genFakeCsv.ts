import { stringify } from 'csv-stringify/sync';
import fs from 'fs/promises';

function randint(max: number, min = 0) {
    return Math.floor(randfloat(max, min));
}

function randfloat(max: number, min = 0) {
    return (max - min) * Math.random() + min;
}

const csv = stringify([[
    'Team Number', 'Average auto score', 'Average teleop score',
], ...new Array(40).fill(0).map(() => [randint(10000), randfloat(5), randfloat(5)])]);

await fs.writeFile('static/output_analysis.csv', csv);
