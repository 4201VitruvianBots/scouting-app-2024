import { matchApp } from "./Schema.js";


async function averageTeleSpeakerNotes():Promise<number> {
    return (await matchApp.aggregate([
    { $group:{
        _id: null,
        avgTeleSpeakerNotes: { $avg: {$add: ['$teleSpeakerNotes.near', '$teleSpeakerNotes.mid', '$teleSpeakerNotes.far']}}
    }}
]))[0].avgTeleSpeakerNotes;
}

async function averageTeleAmpNotes():Promise<number> {
    return (await matchApp.aggregate([
    {$group:{
        _id: null,
        avgTeleAmpNotes: { $avg: '$teleAmpNotes'}
    }}
]))[0].avgTeleAmpNotes;
}

async function averageAutoSpeakerNotes():Promise<number> {
    return (await matchApp.aggregate([
    {$group:{
        _id: null,
        avgAutoSpeakerNotes: { $avg: {$add: ['$autoSpeakerNotes.near', '$autoSpeakerNotes.mid', '$autoSpeakerNotes.far']}}
    }}
]))[0].avgAutoSpeakerNotes;
}

async function averageAutoAmpNotes():Promise<number> {
    return (await matchApp.aggregate([
    {$group:{
        _id: null,
        avgAutoAmpNotes: {$avg: '$autoAmpNotes'}
    }}
    
]))[0].avgAutoAmpNotes;
}

async function maxTeleSpeakerNotes():Promise<number> {
    return (await matchApp.aggregate([
        {$group:{
            _id: null,
            maxTeleSpeakerNotes: {$max: {$add:['$teleSpeakerNotes.near', '$teleSpeakerNotes.mid', '$teleSpeakerNotes.far']}}
        }}
    ]))[0].maxTeleSpeakerNotes;
}

async function maxTeleAmpNotes():Promise<number> {
    return (await matchApp.aggregate([
       {$group:{
            _id: null,
            maxTeleAmpNotes: {$max: '$teleAmpNotes'}
       }} 
    ]))[0].maxTeleAmpNotes;
}

async function maxAutoSpeakerNotes():Promise<number> {
    return (await matchApp.aggregate([
       {$group:{
            _id: null,
            maxAutoSpeakerNotes: {$max: {$add: ['$autoSpeakerNotes.near', '$autoSpeakerNotes.mid', '$autoSpeakerNotes.far']}}
       }} 
    ]))[0].maxAutoSpeakerNotes;
}

async function maxAutoAmpNotes():Promise<number> {
    return (await matchApp.aggregate([
       {$group:{
            _id: null,
            maxAutoAmpNotes: {$max: '$autoAmpNotes'}
       }} 
    ]))[0].maxAutoAmpNotes;
}

async function averageTrapNotes():Promise<number> {
    return (await matchApp.aggregate([
        {$group:{
            _id: null,
            avgTrapNotes: {$avg: '$trapNotes'}
        }}
    ]))[0].avgTrapNotes;
}

async function maxTrapNotes():Promise<number> {
    return (await matchApp.aggregate([
        {$group:{
            _id: null,
            maxTrapNotes: {$max: '$trapNotes'}
        }}
    ]))[0].maxTrapNotes;
}

export {averageAutoAmpNotes, averageTeleAmpNotes, averageAutoSpeakerNotes, averageTeleSpeakerNotes, maxTeleSpeakerNotes, 
        maxTeleAmpNotes, maxAutoAmpNotes, maxAutoSpeakerNotes, averageTrapNotes, maxTrapNotes} 