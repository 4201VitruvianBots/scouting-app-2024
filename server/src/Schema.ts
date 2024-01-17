//import {matchApp, SSApp, pitApp} from './database.ts';

import mongoose  from "mongoose";

const metaDataSchema = new mongoose.Schema({
    scouterName: String,
    robotTeam: Number,
    robotPosition: {
        type: String,
        enum: ['red 1', 'red 2', 'red 3', 'blue 1', 'blue 2', 'blue 3']
    }
});

const matchDataSchema = new mongoose.Schema({
    metaData: [metaDataSchema],
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

/* const superScoutDataSchema = new mongoose.Schema({
     metaData: [metaDataSchema],
     fouls: {

     },
     defense: Number,
     spotLitRobots: Number,
     coOp: Boolean,
     stationPlayerTeam: Number
 });
*/

 const pitDataSchema = new mongoose.Schema({
     ScoutName: String,
     teamNumber: Number,
     heightMeters: Number,
     weightKg: Number,
     pitBattery: Number,
     drivebase: {

     }
 });

// const ssApp = ('ssApp', superScoutDataSchema);
const pitApp = mongoose.model('pitApp', pitDataSchema);
const matchApp =  mongoose.model("matchApp", matchDataSchema); 

export {matchApp, pitApp};

