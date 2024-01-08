export type RobotPosition =
    | 'red_1'
    | 'red_2'
    | 'red_3'
    | 'blue_1'
    | 'blue_2'
    | 'blue_3';
export type Foul = 'A' | 'B';
export type ScoringLocation = 'A' | 'B';

export interface MetaData {
    scouterName: string;
    robotTeam: number;
    robotPosition: RobotPosition;
}

// - `POST` `/data/match`

export interface MatchData {
    metadata: MetaData;
    // No competition info
    nonAmpedSpeakerNotes: number;
    ampedSpeakerNotes: number;
    ampNotes: number;
    trapNotes: number;
    highNotes: number;
    scoringLocations: Record<ScoringLocation, number>;
    climb: 'failed' | 'success' | 'harmony';
    parked: boolean;
    disabledSeconds: number;
}

// - `POST` `/data/super`

export type SuperData = {
    metadata: MetaData;
    fouls: Record<Foul, number>;
    defense: unknown;
    driverSKill: unknown; // Similar to defense
    spotlitRobots: number;
    coOp: boolean;
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
    matches: Record<RobotPosition | 'red_ss' | 'blue_ss', boolean>[];
}

// - `GET` `/data/schedule.json`

export interface MatchSchedule {
    matches: Record<RobotPosition, number>;
}
