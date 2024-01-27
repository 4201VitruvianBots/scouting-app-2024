//import {matchApp, SSApp, pitApp} from './database.ts';

import mongoose  from "mongoose";
import { MatchData, PitFile } from "requests";

const metaDataSchema = {
    scouterName: String,
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

const matchDataSchema = new mongoose.Schema<MatchData>({
    metadata: metaDataSchema,
    leftStartingZone: Boolean,
    autoSpeakerNotes: scoreRanges,
    autoAmpNotes: Number,
    teleNonAmpedSpeakerNotes: scoreRanges,
    teleAmpedSpeakerNotes: scoreRanges,
    teleAmpNotes: Number,
    trapNotes: Number,
    highNotes: Number,
    climb: {
        type: String,
        enum: ['amp', 'source', 'center', 'park', 'none', 'failed']
    }

});

/* const superScoutDataSchema = new mongoose.Schema<SuperData>({
     metadata: metaDataSchema,
     fouls: {
        A: Number,
        B: Number
     },
     defense: Number,
     spotLitRobots: Number,
     coOp: Boolean,
     stationPlayerTeam: Number
 });
*/

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
/* const superApp =  mongoose.model("superApp", superScoutDataSchema); */ 

export {matchApp, pitApp, };
