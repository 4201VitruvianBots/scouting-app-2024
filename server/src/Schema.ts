import mongoose from 'mongoose';
import { CommentValues, MatchData, PitFile, SuperData } from 'requests';

const matchappsMetaDataSchema = {
    scouterName: String,
    matchNumber: Number,
    robotTeam: Number,
    robotPosition: {
        type: String,
        enum: ['red_1', 'red_2', 'red_3', 'blue_1', 'blue_2', 'blue_3'],
    },
};

const superappsMetaDataSchema = {
    scouterName: String,
    matchNumber: Number,
    robotTeam: Number,
    robotPosition: {
        type: String,
        enum: ['red_1', 'red_2', 'red_3', 'blue_1', 'blue_2', 'blue_3'],
    },
};

const scoreRanges = {
    near: Number,
    mid: Number,
    far: Number,
    amp: Number,
    miss: Number,
};

const matchDataSchema = new mongoose.Schema<MatchData>({
    metadata: matchappsMetaDataSchema,
    leftStartingZone: Boolean,
    autoNotes: scoreRanges,
    teleNotes: scoreRanges,
    trapNotes: Number,
    climb: {
        type: String,
        enum: ['amp', 'source', 'center', 'park', 'none', 'failed'],
    },
});

const superScoutDataSchema = new mongoose.Schema<SuperData>({
    metadata: superappsMetaDataSchema,
    fouls: {
        insideRobot: Number,
        protectedZone: Number,
        pinning: Number,
        multiplePieces: Number,
        other: Number,
    },
    break: {
        mechanismDmg: Number,
        batteryFall: Number,
        commsFail: Number,
    },
    defense: {
        type: String,
        enum: ['fullDef', 'someDef', 'noDef'],
    },
    defended: Boolean,
    humanShooter: {
        highNotes: {
            amp: Boolean,
            source: Boolean,
            center: Boolean,
        },
    },
    // Are you asking about this error?
    // Currently the error is it's supposed to be a string array but it's only a string
    // yeah I am
    /*n different error now

*/
    comments: [
        {
            type: String,
            enum: [
                'great_driving',
                'good_driving',
                'source_only',
                'clogging',
                'effective_defense',
                'okay_defense',
                'ineffective_defense',
                'sturdy_build',
                'weak_build',
                'avoids_under_stage',
            ] satisfies CommentValues[],
        },
    ],
});

type PitDataSchemaType = {
    [K in keyof PitFile]: K extends 'photo' ? Buffer : PitFile[K];
};

const pitDataSchema = new mongoose.Schema<PitDataSchemaType>({
    scouterName: String,
    teamNumber: Number,
    capabilities: {
        amp: Boolean,
        speaker: Boolean,
        trap: Boolean,
        climb: Boolean,
        chainTraversal: Boolean,
    },
    preference: {
        ampPrefer: Boolean,
        speakerPerfer: Boolean,
        trapPrefer: Boolean,
        climbPrefer: Boolean,
    },
    autoCapability: [String],
    teamRole: {
        type: String,
        enum: ['scoring', 'defense', 'support', 'all-round'],
    },
    pitBatteryCount: Number,
    drivebase: {
        type: String,
        enum: ['tank', 'swerve', 'MECANUM', 'other'],
    },
    photo: Buffer,
    comments: String,
});

// const ssApp = ('ssApp', superScoutDataSchema);
const pitApp = mongoose.model('pitApp', pitDataSchema);
const matchApp = mongoose.model('matchApp', matchDataSchema);
const superApp = mongoose.model('superApp', superScoutDataSchema);

export {
    matchApp,
    pitApp,
    matchDataSchema,
    pitDataSchema,
    superApp,
    superScoutDataSchema,
};
