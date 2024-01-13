//import {matchApp, SSApp, pitApp} from './database.ts';

import mongoose  from "mongoose";

const metaDataSchema = new mongoose.Schema({
    scouterName: String,
    robotTeam: Number,
    // robotPosistion: {
    //     red: {
    //         type: Number,
    //         min: 1,
    //         max: 3
    // },
    //     blue: {
    //         type: Number,
    //         min: 1,
    //         max: 3
    // }}
});

const matchDataSchema = new mongoose.Schema({
    metaData: [metaDataSchema],
    nonAmpedSpeakerNotes: Number,
    ampedSpeakerNotes: Number,
    ampNotes: Number,
    trapNotes: Number,
    highNotes: Number,
    climb: {
        failed: Boolean,
        success: Boolean,
        harmony: Boolean,
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

