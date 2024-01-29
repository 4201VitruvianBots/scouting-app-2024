//import {matchApp, SSApp, pitApp} from './database.ts';

import mongoose from "mongoose";
import { MatchData, PitFile, MetaData } from "../requests/index.js";

const metaDataSchema = new mongoose.Schema<MetaData>({
    scouterName: String,
    robotTeam: Number,
    robotPosition: {
        type: String,
        enum: ['red_1', 'red_2', 'red_3', 'blue_1', 'blue_2', 'blue_3']
    }
});

const scoreRanges = {
    near: Number,
    mid: Number,
    far: Number
}

const matchDataSchema = new mongoose.Schema<MatchData, unknown, {totalAuto: number, totalTele: number, total: number}>({
    metadata: [metaDataSchema],
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

 matchDataSchema.virtual('totalAuto')
     .get(function(){
         return this.autoSpeakerNotes.near + this.autoSpeakerNotes.mid + this.autoSpeakerNotes.far + this.autoAmpNotes;
     }); 
matchDataSchema.virtual('totalTele')
     .get(function(){
        return this.teleAmpNotes + this.teleAmpedSpeakerNotes.far + this.teleAmpedSpeakerNotes.mid + this.teleAmpedSpeakerNotes.near + 
        this.teleNonAmpedSpeakerNotes.far + this.teleNonAmpedSpeakerNotes.mid + this.teleNonAmpedSpeakerNotes.near;
     });
matchDataSchema.virtual('total')
     .get(function() {
        return this.totalAuto + this.totalTele;
     });

     

matchDataSchema.set('toObject', { virtuals: true }); 

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
