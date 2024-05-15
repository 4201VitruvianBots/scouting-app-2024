import fetch from 'node-fetch';
import { dotenvLoad } from 'dotenv-mono';
import fs from 'fs';

dotenvLoad({ path: '.env' });
dotenvLoad({ path: '.env.local' });

const apiKey = process.env.API_KEY!;
const eventKey = process.env.EVENT_KEY!;
console.log(apiKey);

interface SimpleTeam {
    key: string;
    team_number: number;
    nickname?: string;
    name: string;
    city?: string;
    state_prov?: string;
    country?: string;
}

const result = await fetch(
    `https://www.thebluealliance.com/api/v3/event/${eventKey}/teams/simple`,
    {
        headers: {
            'X-TBA-Auth-Key': apiKey,
        },
    }
);

console.log(result.status);

const data = (await result.json()) as SimpleTeam[];
console.log(data);
const teams = data.map(e => e.team_number).sort((a, b) => a - b);

console.log(teams);

fs.writeFileSync(
    '../client/src/assets/teams.txt',
    teams.map(e => `${e}\n`).join('')
);
