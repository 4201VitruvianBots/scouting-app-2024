import fetch from 'node-fetch';
import { dotenvLoad } from 'dotenv-mono';
import fs from 'fs';

interface TeamData {
    [teamNumber: string]: {
        primaryHex: string;
        secondaryHex: string;
        verified: boolean;
        avatar?: string;
        info: TeamInfo | {
            Error: string;
        };
    };
};

interface TeamInfo {
    address: null;
    city: string | null;
    country: string | null;
    gmaps_place_id: null;
    gmaps_url: null;
    home_championship: Record<string, string> | null;
    key: string;
    lat: null;
    lng: null;
    location_name: null;
    motto: null;
    name: string;
    nickname: string;
    postal_code: string;
    rookie_year: number;
    school_name: string;
    state_prov: string;
    team_number: number;
    website: string | null;
};

interface AvatarData {
    foreign_key: string;
    preferred: boolean;
    type: string;
    details: {
      base64Image: string;
    };
    direct_url: string;
    view_url: string;
  }


dotenvLoad({ path: '.env' });
dotenvLoad({ path: '.env.local' });
const apiKey = process.env.API_KEY!;

// Get every team number in the output_analysis.json file
const teams = JSON.parse(fs.readFileSync('static/output_analysis.json', 'utf-8')).map((e: {teamNumber: number}) => e.teamNumber);

// Create a teamColors object to store the color for each team
const teamInfo: TeamData = {};

console.log("Getting team colors...");

// Get the color for each team. If it returns a 404, default to gray
for (const team of teams) {
    const color = await fetch(`https://api.frc-colors.com/v1/team/${team}`);
    const colorJson = await color.json() as TeamData;
    if (color.status === 404) {
        teamInfo[team] = {
            primaryHex: '#7f7f7f',
            secondaryHex: '#7f7f7f',
            verified: false,
            info: {Error: "Info not loaded"},
        };
    } else {
        teamInfo[team] = {
            primaryHex: colorJson[team].primaryHex,
            secondaryHex: colorJson[team].secondaryHex,
            verified: colorJson[team].verified,
            info: colorJson[team].info,
        };
    }
}

console.log("Getting team avatars...");

// Get the avatar for each team.
for (const team of teams) {
    const avatar = await fetch(`https://www.thebluealliance.com/api/v3/team/${'frc' + team}/media/2024`, {
        headers: {
            'X-TBA-Auth-Key': apiKey,
        },
    });
    const avatarJson = await avatar.json() as AvatarData;
    if (avatar.status !== 404) {
        teamInfo[team].avatar = avatarJson.details.base64Image;
    }
}

console.log("Getting team info...");

// Get the information for each team
for (const team of teams) {
    const info = await fetch(`https://www.thebluealliance.com/api/v3/team/${'frc' + team}`, {
        headers: {
            'X-TBA-Auth-Key': apiKey,
        },
    });
    const infoJson = await info.json() as TeamInfo;
    teamInfo[team].info = infoJson;
}

fs.writeFileSync('static/team_info.json', JSON.stringify(teamInfo));

console.log("Successfully downloaded information for " + teams.length + " teams");