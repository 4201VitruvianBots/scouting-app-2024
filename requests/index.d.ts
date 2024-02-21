export type ClimbPosition = StageLocation | 'park' | 'none' | 'failed';
export type StageLocation = 'amp' | 'source' | 'center'
export type PickupLocation = 'speaker' | 'middle' | 'source' | 'preload' | 'pickup'
export type teamRoles = 'scoring' | 'defense' | 'support' | 'all-round' 
export type drivebase = 'tank' | 'swerve' | 'MECANUM' | 'other' 

export type RobotPosition =
    | 'red_1'
    | 'red_2'
    | 'red_3'
    | 'blue_1'
    | 'blue_2'
    | 'blue_3'
export type Foul = 
    | 'inBot' 
    | 'damageBot' 
    | 'tipEntangBot' 
    | 'pinBot' 
    | 'podiumFoul' 
    | 'zoneFoul' 
    | 'stageFoul' 
    | 'overExtChute';
export type DefenseRank = 
    |  'Full Defense' 
    | 'Some Defense' 
    | 'No Defense';

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
    far: number,
    amp: number,
    miss: number
}

// - `POST` `/data/match`

export interface MatchData {
    metadata: MetaData;
    // No competition info
    leftStartingZone: boolean;
    autoNotes: ScoreRanges;
    teleNotes: ScoreRanges;
    trapNotes: number;
    climb: ClimbPosition;
    // disabledSeconds: number;
}

// - `POST` `/data/super`

export interface SuperData {
    metadata: MetaData;
    fouls: Record<Foul, number>;
    defense: unknown;
    driverSKill: unknown; // Similar to defense
    spotlitRobots: number;
    highNotes: number;
    stationPlayerTeam: number; // Team Number
};

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

export interface StatusReport {
    robotPosition: RobotPosition|SuperPosition|undefined;
    matchNumber: number|undefined;
    scouterName: string;
    battery: number | undefined;
}

// - `WebSocket` `/status/recieve`
// server -> client

export interface StatusRecieve {
    scouters: StatusReport[];
    matches: MatchStatus
}

export type MatchStatus = Record<number, Record<RobotPosition, {schedule: number, real:number[]}> & Record<SuperPosition, boolean>> 
// - `GET` `/data/schedule.json`

export type MatchSchedule = Record<number, Record<RobotPosition,number>> 
