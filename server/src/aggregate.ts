import { matchApp } from "./Schema.js";


const averageTeleNonAmpedSpeaker = await matchApp.aggregate([
    { $group:{
        _id: null,
        avgTeleNotes: { $avg: {$add: ['$teleNonAmpedSpeakerNotes.near', '$teleNonAmpedSpeakerNotes.mid', '$teleNonAmpedSpeakerNotes.far']}}
    }}
]);

const averageTeleAmpedSpeaker = await matchApp.aggregate([
    {$group:{
        _id: null,
        avgTeleNotes: { $avg: {$add: ['$teleAmpedSpeakerNotes.near', '$teleAmpedSpeakerNotes.mid', '$teleAmpedSpeakerNotes.far']}}
    }}
]);

const averageTeleAmpNotes = await matchApp.aggregate([
    {$group:{
        _id: null,
        avgTeleNotes: { $avg: '$teleAmpNotes'}
    }}
]);

const averageAutoSpeakerNotes = await matchApp.aggregate([
    {$group:{
        _id: null,
        avgAutoNotes: { $avg: {$add: ['$autoSpeakerNotes.near', '$autoSpeakerNotes.mid', '$autoSpeakerNotes.far']}}
    }}
]);

const averageAutoNotes = await matchApp.aggregate([
    {$group:{
        _id: null
    }}
]);







