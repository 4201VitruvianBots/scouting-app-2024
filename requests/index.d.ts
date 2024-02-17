export type ClimbPosition = 'amp' | 'source' | 'center' | 'park' | 'none' | 'failed';

export type RobotPosition =
    | 'red_1'
    | 'red_2'
    | 'red_3'
    | 'blue_1'
    | 'blue_2'
    | 'blue_3';
export type Foul = 
    |'inBot' 
    | 'damageBot' 
    | 'tipEntangBot' 
    | 'pinBot' 
    | 'podiumFoul' 
    | 'zoneFoul' 
    | 'stageFoul' 
    | 'overExtChute';

export type SuperPosition = 
    | 'red_ss'
    | 'blue_ss';
// export type ScoringLocation = 'A' | 'B';

export interface matchDataAggregations{
    averageTeleSpeakerNotes: number;
    averageTeleAmpNotes: number;
    averageAutoSpeakerNotes: number;
    averageAutoAmpNotes: number;
    averageTrapNotes:number;
    maxTeleSpeakerNotes: number;
    maxTeleAmpNotes: number;
    maxAutoSpeakerNotes: number;
    maxAutoAmpNotes: number;
    maxTrapNotes: number;
}

export interface MetaData {
    scouterName: string;
    matchNumber: number;
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
    heightMeters: number;
    weightKg: number;
    pitBatteryCount: number;
    drivebase: 'tank' | 'swerve' | 'mecanum' | 'other';
}

// - `WebSocket` `/status/report`
// client -> server

export type StatusReport = MetaData;

// - `WebSocket` `/status/recieve`
// server -> client

export interface StatusRecieve {
    scouters: MetaData[];
    matches: Record<RobotPosition | SuperPosition, boolean>[];
}

// - `GET` `/data/schedule.json`

export type MatchSchedule = Record<number, Record<RobotPosition,number>> 