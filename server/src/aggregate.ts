import { matchApp, superApp } from "./Schema.js";

interface AverageAndMax{
    _id: {teamNumber: number},
    avgTeleSpeakerNotes:number,
    avgTeleAmpNotes: number,
    avgAutoSpeakerNotes: number,
    avgAutoAmpNotes: number,
    maxTeleSpeakerNotes: number,
    maxTeleAmpNotes: number,
    maxAutoSpeakerNotes: number,
    maxAutoAmpNotes: number,
    maxTrapNotes: number
}

async function averageAndMax():Promise<AverageAndMax[]>{
    return (await matchApp.aggregate([
    { $group:{
        _id: {teamNumber: '$metadata.robotTeam'},
        avgTeleSpeakerNotes: {$avg: {$add: ['$teleSpeakerNotes.near', '$teleSpeakerNotes.mid', '$teleSpeakerNotes.far']}},
        avgTeleAmpNotes: { $avg: '$teleAmpNotes'},
        avgAutoSpeakerNotes: {$avg: {$add:['$autoSpeakerNotes.near', '$autoSpeakerNotes.mid', '$autoSpeakerNotes.far']}},
        avgAutoAmpNotes: {$avg: '$autoAmpNotes'},
        maxTeleSpeakerNotes: {$max: {$add:['$teleSpeakerNotes.near', '$teleSpeakerNotes.mid', '$teleSpeakerNotes.far']}},
        maxTeleAmpNotes: {$max: '$teleAmpNotes'},
        maxAutoSpeakerNotes: {$max: {$add: ['$autoSpeakerNotes.near', '$autoSpeakerNotes.mid', '$autoSpeakerNotes.far']}},
        maxAutoAmpNotes: {$max: '$autoAmpNotes'},
        maxTrapNotes: {$max: '$trapNotes'}
    }}
]));
}

async function superAverageAndMax() {
    return (await superApp.aggregate([
        {$group:{
            _id: null,
            avgFouls: {$avg: {$add:['$fouls.inBot', '$fouls.damageBot', '$fouls.tipEntangBot', '$fouls.pinBot', '$fouls.podiumFoul', '$fouls.zoneFoul', '$fouls.stageFoul', 'fouls.overExtChute']}},
            maxFouls: {$max: {$add:['$fouls.inBot', '$fouls.damageBot', '$fouls.tipEntangBot', '$fouls.pinBot', '$fouls.podiumFoul', '$fouls.zoneFoul', '$fouls.stageFoul', 'fouls.overExtChute']}},
            
        }}
    ]))
}

export { averageAndMax, superAverageAndMax} 