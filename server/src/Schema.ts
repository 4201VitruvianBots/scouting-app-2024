//import {matchApp, SSApp, pitApp} from './database.ts';

import mongoose  from "mongoose";
import { MatchData, PitFile, SuperData } from "requests";

const metaDataSchema = {
    scouterName: String,
    matchNumber: Number,
    robotTeam: Number,
    robotPosition: {
        type: String,
        enum: ['red_1', 'red_2', 'red_3', 'blue_1', 'blue_2', 'blue_3']
    }
};

const scoreRanges = {
    near: Number,
    mid: Number,
    far: Number
}

const matchDataSchema = new mongoose.Schema<MatchData, unknown, {totalAuto: number, totalTele: number, total: number}>({
    metadata: metaDataSchema,
    leftStartingZone: Boolean,
    autoSpeakerNotes: scoreRanges,
    autoAmpNotes: Number,
    teleSpeakerNotes: scoreRanges,
    teleAmpNotes: Number,
    trapNotes: Number,
    climb: {
        type: String,
        enum: ['amp', 'source', 'center', 'park', 'none', 'failed']
    }
});

 const superScoutDataSchema = new mongoose.Schema<SuperData>({
     metadata: metaDataSchema,
     fouls: {
        Reaching: Number,
        Jumping: Number,
        Banging: Number,
        Card: Number,
        Other: Number
     },
     Mechanical: {
        driverChoice: Boolean,
        batteryFall: Boolean,
        defense: Boolean
     },
     defense: Boolean,
     wasDefended:Boolean,
     spotLitRobots: Boolean,
     stationPlayerTeam: Number
 });


 const pitDataSchema = new mongoose.Schema<PitFile>({
     scouterName: String,
     teamNumber: Number,
     heightMeters: Number,
     weightKg: Number,
     pitBatteryCount: Number,
     drivebase: {
            type: String,
            enum: ['Tank', 'swerve', 'other' ]
     }
 });

// const ssApp = ('ssApp', superScoutDataSchema);
const pitApp = mongoose.model('pitApp', pitDataSchema);
const matchApp =  mongoose.model("matchApp", matchDataSchema); 
const superApp =  mongoose.model("superApp", superScoutDataSchema); 


export {matchApp, pitApp, superApp};
