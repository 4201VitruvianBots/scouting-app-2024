//import {matchApp, SSApp, pitApp} from './database.ts';

import mongoose  from "mongoose";
import { MatchData, PitFile, MetaData } from "../requests/index.js";

const metaDataSchema = new mongoose.Schema<MetaData>({
    scouterName: String,
    robotTeam: Number,
    robotPosition: {
        type: String,
        enum: ['red_1', 'red_2', 'red_3', 'blue_1', 'blue_2', 'blue_3']
    }
});

const matchDataSchema = new mongoose.Schema<MatchData>({
    metadata: [metaDataSchema],
    nonAmpedSpeakerNotes: Number,
    ampedSpeakerNotes: Number,
    ampNotes: Number,
    trapNotes: Number,
    highNotes: Number,
    climb: {
        type: String,
        enum: ['failed', 'success', 'harmony']
    },
    parked: Boolean,
    disabledSeconds: Number

});

/* const superScoutDataSchema = new mongoose.Schema<SuperData>({
     metadata: [metaDataSchema],
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

