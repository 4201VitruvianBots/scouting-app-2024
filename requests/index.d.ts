export type ClimbPosition = 'amp' | 'source' | 'center' | 'park' | 'none' | 'failed'
export type teamRoles = 'scoring' | 'defense' | 'support' | 'all-round' 
export type drivebase = 'tank' | 'swerve' | 'MECANUM' | 'other' 

export type RobotPosition =
    | 'red_1'
    | 'red_2'
    | 'red_3'
    | 'blue_1'
    | 'blue_2'
    | 'blue_3';
export type Foul = 'A' | 'B';
interface capabilities { 
    amp: boolean,
    speaker: boolean
    trap: boolean,
    climb: boolean,
    chainTraversal: boolean
}
interface preference {
    ampPrefer: boolean,
    speakerPerfer:boolean,
    trapPrefer: boolean,
    climbPrefer: boolean,

}
// export type ScoringLocation = 'A' | 'B';

export interface matchDataAggregations{
    averageTeleSpeakerNotes: number;
    averageTeleAmpNotes: number;
    averageAutoSpeakerNotes: number;
    averageAutoAmpNotes: number;
    maxTeleSpeakerNotes: number;
    maxTeleAmpNotes: number;
    maxAutoSpeakerNotes: number;
    maxAutoAmpNotes: number;
}

export interface MetaData {
    scouterName: string;
    robotTeam: number;
    robotPosition: RobotPosition;
}

interface ScoreRanges {
    near: number,
    mid: number,
    far: number
}

// - `POST` `/data/match`

export interface MatchData {
    metadata: MetaData;
    // No competition info
    leftStartingZone: boolean;
    autoSpeakerNotes: ScoreRanges;
    autoAmpNotes: number;
    teleSpeakerNotes: ScoreRanges;
    teleAmpNotes: number;
    trapNotes: number;
    climb: ClimbPosition;
    // disabledSeconds: number;
}

// - `POST` `/data/super`

export type SuperData = {
    metadata: MetaData;
    fouls: Record<Foul, number>;
    defense: unknown;
    driverSKill: unknown; // Similar to defense
    spotlitRobots: number;
    highNotes: number;
    stationPlayerTeam: number; // Team Number
}[];

// - `POST` `/data/pits` 
// `<form>` files?

export interface PitFile {
    scouterName: string;
    teamNumber: number;
    capabilities: capabilities;
    preference: preference;
    autoCapability: string[];
    teamRole: teamRoles;
    pitBatteryCount: number;
    drivebase: drivebase;
    comments: string;
}

// - `WebSocket` `/status/report`
// client -> server

export type StatusReport = MetaData;

// - `WebSocket` `/status/recieve`
// server -> client

export interface StatusRecieve {
    scouters: MetaData[];
    matches: Record<RobotPosition | 'red_ss' | 'blue_ss', boolean>[];
}

// - `GET` `/data/schedule.json`

export interface MatchSchedule {
    matches: Record<RobotPosition, number>;
}
