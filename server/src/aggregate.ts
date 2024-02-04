import { matchApp } from "./Schema.js";


async function averageTeleNonAmpedSpeaker() {
    return await matchApp.aggregate([
    { $group:{
        _id: null,
        avgTeleNonAmpedNotes: { $avg: {$add: ['$teleNonAmpedSpeakerNotes.near', '$teleNonAmpedSpeakerNotes.mid', '$teleNonAmpedSpeakerNotes.far']}}
    }}
]);
}

async function averageTeleAmpedSpeaker(){
    return await matchApp.aggregate([
    {$group:{
        _id: null,
        avgTeleAmpedNotes: { $avg: {$add: ['$teleAmpedSpeakerNotes.near', '$teleAmpedSpeakerNotes.mid', '$teleAmpedSpeakerNotes.far']}}
    }}
]);
}

async function averageTeleAmpNotes() {
    return await matchApp.aggregate([
    {$group:{
        _id: null,
        avgTeleAmpNotes: { $avg: '$teleAmpNotes'}
    }}
]);
}

async function averageAutoSpeakerNotes() {
    return await matchApp.aggregate([
    {$group:{
        _id: null,
        avgAutoSpeakerNotes: { $avg: {$add: ['$autoSpeakerNotes.near', '$autoSpeakerNotes.mid', '$autoSpeakerNotes.far']}}
    }}
]);
}

async function averageAutoAmpNotes() {
    return await matchApp.aggregate([
    {$group:{
        _id: null,
        avgAutoAmpNotes: {$avg: '$autoAmpNotes'}
    }}
]);
}

async function maxTeleNonAmpedSpeakerNotes() {
    return await matchApp.aggregate([
        {$group:{
            _id: null,
            maxTeleNonAmpedNotes: {$max: {$add:['$teleNonAmpedSpeakerNotes.near', '$teleNonAmpedSpeakerNotes.mid', '$teleNonAmpedSpeakerNotes.far']}}
        }}
    ]);
}

async function maxTeleAmpedSpeakerNotes() {
    return await matchApp.aggregate([
        {$group:{
            _id: null,
            maxteleAmpedNotes: {$max: {$add:['$teleAmpedSpeakerNotes.near', '$teleAmpedSpeakerNotes.mid', '$teleAmpedSpeakerNotes.far']}}
        }}
    ]);
}

async function maxTeleAmpNotes() {
    return await matchApp.aggregate([
       {$group:{
            _id: null,
            maxteleAmpNotes: {$max: '$teleAmpNotes'}
       }} 
    ]);
}

async function maxAutoAmpNotes() {
    return await matchApp.aggregate([
       {$group:{
            _id: null,
            maxAutoAmpNotes: {$max: '$autoAmpNotes'}
       }} 
    ]);
}

export {averageAutoAmpNotes, averageTeleAmpNotes, averageTeleNonAmpedSpeaker, averageAutoSpeakerNotes, averageTeleAmpedSpeaker, maxTeleAmpedSpeakerNotes, 
        maxTeleNonAmpedSpeakerNotes, maxTeleAmpNotes, maxAutoAmpNotes} 