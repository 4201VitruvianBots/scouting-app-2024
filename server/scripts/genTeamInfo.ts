import fetch from 'node-fetch';
import { dotenvLoad } from 'dotenv-mono';
import fs from 'fs';

dotenvLoad({ path: '.env' });
dotenvLoad({ path: '.env.local' });
const apiKey = process.env.API_KEY!;

// Get every team number in the output_analysis.json file
const teams = JSON.parse(fs.readFileSync('static/output_analysis.json', 'utf-8')).map((e: any) => e.teamNumber);

// Create a teamColors object to store the color for each team
const teamInfo: any = {};

console.log("Getting team colors...");

// Get the color for each team. If it returns a 404, default to gray
for (const team of teams) {
    const color = await fetch(`https://api.frc-colors.com/v1/team/${team}`);
    const colorJson = await color.json();
    if (color.status === 404) {
        teamInfo[team] = {
            primaryHex: '#7f7f7f',
            secondaryHex: '#7f7f7f',
            verified: false,
        };
    } else {
        teamInfo[team] = colorJson;
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
    const avatarJson = await avatar.json();
    if ((avatarJson as any[]).length > 0) {
        teamInfo[team].avatar = (avatarJson as any[])[0].details.base64Image;
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
    const infoJson = await info.json();
    teamInfo[team].info = infoJson;
}

fs.writeFileSync('static/team_info.json', JSON.stringify(teamInfo));

console.log("Successfully downloaded information for " + teams.length + " teams");