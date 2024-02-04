import { matchApp } from "./Schema.js";


async function averageTeleSpeakerNotes() {
    return await matchApp.aggregate([
    { $group:{
        _id: null,
        avgTeleSpeakerNotes: { $avg: {$add: ['$teleSpeakerNotes.near', '$teleSpeakerNotes.mid', '$teleSpeakerNotes.far']}}
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

async function maxTeleSpeakerNotes() {
    return await matchApp.aggregate([
        {$group:{
            _id: null,
            maxTeleNonAmpedNotes: {$max: {$add:['$teleSpeakerNotes.near', '$teleSpeakerNotes.mid', '$teleSpeakerNotes.far']}}
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

async function maxAutoSpeakerNotes() {
    return await matchApp.aggregate([
       {$group:{
            _id: null,
            maxAutoSpeakerNotes: {$max: '$autoSpeakerNotes'}
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

export {averageAutoAmpNotes, averageTeleAmpNotes, averageAutoSpeakerNotes, averageTeleSpeakerNotes, maxTeleSpeakerNotes, 
        maxTeleAmpNotes, maxAutoAmpNotes, maxAutoSpeakerNotes} 