import fetch from 'node-fetch';
import { dotenvLoad } from 'dotenv-mono';
import fs from 'fs';

dotenvLoad({ path: '.env' });
dotenvLoad({ path: '.env.local' });
const apiKey = process.env.API_KEY!;
const eventKey = process.env.EVENT_KEY!;    

console.log(apiKey);
interface SimpleMatch {
    key: string;
    comp_level: 'qm' | 'ef' | 'qf' | 'sf' | 'f';
    set_number: number;
    match_number: number;
    alliances: {
        [_ in 'red' | 'blue']: {
            score: number;
            team_keys: string[];
            surrogate_team_keys?: string[];
            dq_team_keys?: string[];
        };
    };
    winning_alliance?: 'red' | 'blue';
    event_key: string;
    time?: number;
    actual_time?: number;
    predicted_time?: number;
    post_result_time?: number;
    score_breakdown?: object | null;
    videos?: { type: 'youtube' | 'tba'; key: string }[];
}

const result = await fetch(
    `https://www.thebluealliance.com/api/v3/event/${eventKey}/matches/simple`,
    {
        headers: {
            'X-TBA-Auth-Key': apiKey,
        },
    }
);

function teamNumber(teamString: string) {
    return parseInt(teamString.slice(3));
}

const data = (await result.json()) as SimpleMatch[];
const schedule = Object.fromEntries(
    data.map(match => [
        match.match_number,
        {
            red_1: teamNumber(match.alliances.red.team_keys[0]),
            red_2: teamNumber(match.alliances.red.team_keys[1]),
            red_3: teamNumber(match.alliances.red.team_keys[2]),
            blue_1: teamNumber(match.alliances.blue.team_keys[0]),
            blue_2: teamNumber(match.alliances.blue.team_keys[1]),
            blue_3: teamNumber(match.alliances.blue.team_keys[2]),
        },
    ])
);

console.log(schedule);

fs.writeFileSync(
    '../client/src/assets/matchSchedule.json',
    JSON.stringify(schedule)
);

console.log("Don't forget to run npm run build!");
