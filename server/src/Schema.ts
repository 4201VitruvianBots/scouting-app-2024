//import {matchApp, SSApp, pitApp} from './database.ts';
import mongoose  from "mongoose";
import { MatchData, PitFile, } from "requests";

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

 /* const superScoutDataSchema = new mongoose.Schema<SuperData>({
     metadata: metaDataSchema,
     fouls: {
        inBot: Number,
        damageBot: Number,
        tipEntangBot: Number,
        pinBot: Number,
        podiumFoul: Number,
        zoneFoul: Number,
        stageFoul: Number,
        overExtChute: Number
     },
     defense: Number,
     highNotes: Number,
     spotlitRobots: Number,
     stationPlayerTeam: Number
 });
*/

 const pitDataSchema = new mongoose.Schema<PitFile>({
     scouterName: String,
     teamNumber: Number,
     capabilities: {
        amp: Boolean,
        speaker: Boolean,
        trap: Boolean,
        climb: Boolean,
        chainTraversal: Boolean
     },
    preference: {
        ampPrefer: Boolean,
        speakerPerfer:Boolean,
        trapPrefer: Boolean,
        climbPrefer: Boolean,
    },
    autoCapability: [String],
    teamRole: {
        type: String,
        enum: ['scoring', 'defense', 'support', 'all-round']
    },
     pitBatteryCount: Number,
     drivebase: {
            type: String,
            enum: ['Tank', 'swerve','MECANUM', 'other' ]
     },
     comments: String
 });

// const ssApp = ('ssApp', superScoutDataSchema);
const pitApp = mongoose.model('pitApp', pitDataSchema);
const matchApp =  mongoose.model("matchApp", matchDataSchema); 
// const superApp =  mongoose.model("superApp", superScoutDataSchema); 


export {matchApp, pitApp, };
