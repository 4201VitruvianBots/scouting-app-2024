import { MatchDataAggregations,SuperDataAggregations } from "requests";
import { matchApp, superApp } from "./Schema.js";




async function averageAndMax():Promise<MatchDataAggregations[]>{
    

    const climbCounts = await matchApp.aggregate([{
        $group: {
            _id: {
                matchNumber: '$metadata.matchNumber',
                alliance: {
                    $cond:  [
                        {$in: [ '$metadata.robotPosition', ['red_1', 'red_2', 'red_3']]},
                        'red',
                        'blue'
                    ]
                }
            },
            source: {
                $sum: { $cond: [{$eq: ['$climb', 'source']}, 1, 0]}
            },
            center: {
                $sum: { $cond: [{$eq: ['$climb', 'center']}, 1, 0]}
            },
            amp: {
                $sum: { $cond: [{$eq: ['$climb', 'amp']}, 1, 0]}
            },
            teams: {
                $push: '$metadata.robotTeam'
            }
        }
    }]);
    // const spotLightCounts = await matchApp.aggregate([
    //    { $group: {
    //         _id: {
    //             matchNumber: '$metadata.matchNumber',
    //             alliance: {
    //                 $cond:  [
    //                     {$in: [ '$metadata.robotPosition', ['red_1', 'red_2', 'red_3']]},
    //                     'red',
    //                     'blue'
    //                 ]
    //             }
    //         },
    //         climbSource: {
    //             $sum: { $cond: [{$eq: ['$climb', 'source']}, 1, 0]}
    //         },
    //         climbCenter: {
    //             $sum: { $cond: [{$eq: ['$climb', 'center']}, 1, 0]}
    //         },
    //         climbAmp: {
    //             $sum: { $cond: [{$eq: ['$climb', 'amp']}, 1, 0]}
    //         }, 
    //     }},
    //     {$lookup: {
    //         from: 'superapps',
    //         foreignField: 'metadata.matchNumber',
    //         localField: '_id.matchNumber',
    //         as: 'test'
    //     }}
        // {$addFields: {
        //       "humanShooter.highNotes.amp":"$amp"
        // }},
        // {$group:{_id:"$_id", HumanShooter:{$push:"$HumanShooter"}}},
        // {$project:{HumanShooter:1,_id:0}}
        // {$group: {
        //     _id: {
        //     humanShooter: '$humanShooter.highNotes',
        // //       climb: { $cond: [{$eq: ['$climb', 'amp']}, 1, 0]}
        //      }
        //      }
            
        //  }   
   // ])
    //    { $lookup: {
    //         from: 'superapps',
    //         foreignField: 'humanShooter.highNotes.amp',
    //         localField: 'climb',
    //         as:'spotlight'
    //     }},
    //    { $addFields: {
    //         spotlight: {
    //            $add: { $cond: [{ $eq: ['$humanShooter', '$climb']},1,0] }
    //         }
    //     }}
    
    const matches = await matchApp.find().select('metadata.matchNumber metadata.robotTeam climb');

    console.log(climbCounts, matches)
//     console.log("spotLightCounts", spotLightCounts)
//   console.log('dig into spotlight: ', spotLightCounts[0].test.humanShooter)

    const result = (await matchApp.aggregate([
    { $group:{
        _id: {teamNumber: '$metadata.robotTeam'},
        averageTeleSpeakerNotes: {$avg: {$add: ['$teleNotes.near', '$teleNotes.mid', '$teleNotes.far']}},
        averageTeleAmpNotes: { $avg: '$teleNotes.amp' },
        averageAutoSpeakerNotes: {$avg: {$add:['$autoNotes.near', '$autoNotes.mid', '$autoNotes.far']}},
        averageAutoAmpNotes: { $avg: '$autoNotes.amp' },
        averageTrapNotes: { $avg: '$trapNotes' },
        maxTeleSpeakerNotes: {$max: {$add:['$teleNotes.near', '$teleNotes.mid', '$teleNotes.far']}},
        maxTeleAmpNotes: { $max: '$teleNotes.amp' },
        maxAutoSpeakerNotes: {$max: {$add: ['$autoNotes.near', '$autoNotes.mid', '$autoNotes.far']}},
        maxAutoAmpNotes: { $max: '$autoNotes.amp' },
        maxTrapNotes: {$max: '$trapNotes'},
        scoringLocation: { $push: {
               $let: {
                vars: {
                    totalNear: {$add: ['$autoNotes.near', '$teleNotes.near']},
                    totalMid: {$add: ['$autoNotes.mid', '$teleNotes.mid']},
                    totalFar: {$add: ['autoNotes.far', '$teleNotes.far']}
                },
                in: {'$$totalNear', '$$totalMid', '$$totalFar'}
               }
               }
               },
        avgClimbRate: {$avg: {$cond: [{$in: ['$climb', ['source', 'center', 'amp']]}, 1,{$cond: [{$eq:['$climb', 'failed']},0,null]}]}},
        
    } satisfies { [K in keyof Omit<MatchDataAggregations, 'harmonyRate'>]: unknown }}
]))

    result.forEach(result => {
        const matchingMatches = matches.filter(match => match.metadata.robotTeam === result._id.teamNumber)
        const matchingClimbCounts = matchingMatches.map(match => climbCounts.find(climbCount => climbCount._id.matchNumber === match.metadata.matchNumber && climbCount.teams.includes(result._id.teamNumber))[match.climb])
        const harmonyCount = matchingClimbCounts.filter(e => e > 1).length;
        console.log('Team:', result._id.teamNumber, harmonyCount, matchingMatches)
        result.harmonyRate = harmonyCount / matchingMatches.length;
    })

    

    console.log(result.map(e => e.harmonyRate))

    return result;
}

async function superAverageAndMax():Promise<SuperDataAggregations[]> {
    
    return (await superApp.aggregate([
        {$group:{
             _id: {teamNumber: '$metadata.robotTeam'},
             avgFouls: {$avg: {$add: [
                {$convert: {input:'$fouls.inBot',to: 'int', onError: 0, onNull: 0}},
                {$convert: {input: '$fouls.damageBot',to: 'int', onError: 0, onNull: 0}},
                {$convert:{ input:'$fouls.tipEntangBot',to: 'int', onError: 0, onNull: 0}},
                {$convert:{input:'$fouls.pinBot', to: 'int', onError: 0, onNull: 0}},
                {$convert:{input:'$fouls.podiumFoul',to:'int', onError: 0, onNull: 0}},
                {$convert:{input:'$fouls.zoneFoul',to:'int', onError: 0, onNull: 0}},
                {$convert:{input:'$fouls.stageFoul',to:'int', onError: 0, onNull: 0}},
                {$convert:{input:'$fouls.multiplePieces',to:'int', onError: 0, onNull: 0}},
                {$convert:{input:'fouls.overExtChute',to:'int', onError: 0, onNull: 0}}]}},
            maxFouls: {$max: {$add: [
                {$convert:{input:'$fouls.inBot',to: 'int', onError: 0, onNull: 0}},
                {$convert: {input:'$fouls.damageBot',to: 'int', onError: 0, onNull: 0}},
                {$convert:{input:'$fouls.tipEntangBot',to: 'int', onError: 0, onNull: 0}},
                {$convert:{input:'$fouls.pinBot', to: 'int', onError: 0, onNull: 0}},
                {$convert:{input:'$fouls.podiumFoul',to:'int', onError: 0, onNull: 0}},
                {$convert:{input:'$fouls.zoneFoul',to:'int', onError: 0, onNull: 0}},
                {$convert:{input:'$fouls.stageFoul',to:'int', onError: 0, onNull: 0}},
                {$convert:{input:'$fouls.multiplePieces',to:'int', onError: 0, onNull: 0}},
                {$convert:{input:'fouls.overExtChute',to:'int', onError: 0, onNull: 0}}]}},
         } satisfies { [K in keyof SuperDataAggregations]: unknown }}
    ]))

}

export { averageAndMax, superAverageAndMax} 