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
   /* const spotLightCounts = await matchApp.aggregate([
       { $group: {
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
            climbSource: {
                $sum: { $cond: [{$eq: ['$climb', 'source']}, 1, 0]}
            },
            climbCenter: {
                $sum: { $cond: [{$eq: ['$climb', 'center']}, 1, 0]}
            },
            climbAmp: {
                $sum: { $cond: [{$eq: ['$climb', 'amp']}, 1, 0]}
            }, 
        }},
        {$lookup: {
            from: 'superapps',
            foreignField: 'matchNumber',
            localField: 'matchNumber',
            as: 'test'
        }},
        {$group: {
           _id: {
             // humanShooter: '$humanShooter.highNotes',
             climb: { $cond: [{$eq: ['$climb', 'amp']}, 1, 0]}
            }
            }
            
        }   */
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
    // console.log("spotLightCounts", spotLightCounts)
    // console.log('dig into spotlight: ', spotLightCounts[0])

    const result = (await matchApp.aggregate([
    { $group:{
        _id: {teamNumber: '$metadata.robotTeam'},
        averageTeleSpeakerNotes: {$avg: {$add: ['$teleSpeakerNotes.near', '$teleSpeakerNotes.mid', '$teleSpeakerNotes.far']}},
        averageTeleAmpNotes: { $avg: '$teleNotes.amp' },
        averageAutoSpeakerNotes: {$avg: {$add:['$autoSpeakerNotes.near', '$autoSpeakerNotes.mid', '$autoSpeakerNotes.far']}},
        averageAutoAmpNotes: { $avg: '$autoNotes.amp' },
        averageTrapNotes: { $avg: '$trapNotes' },
        maxTeleSpeakerNotes: {$max: {$add:['$teleSpeakerNotes.near', '$teleSpeakerNotes.mid', '$teleSpeakerNotes.far']}},
        maxTeleAmpNotes: { $max: '$teleNotes.amp' },
        maxAutoSpeakerNotes: {$max: {$add: ['$autoSpeakerNotes.near', '$autoSpeakerNotes.mid', '$autoSpeakerNotes.far']}},
        maxAutoAmpNotes: { $max: '$autoNotes.amp' },
        maxTrapNotes: {$max: '$trapNotes'},
        avgClimbRate: {$avg: {$cond: [{$in: ['$climb', ['source', 'center', 'amp']]}, 1, 0]}},
        
    } satisfies { [K in keyof MatchDataAggregations]: unknown }}
]))

    result.forEach(result => {
        const matchingMatches = matches.filter(match => match.metadata.robotTeam === result._id.teamNumber);
        const matchingClimbCounts = matchingMatches.map(match => climbCounts.find(climbCount => climbCount._id.matchNumber === match.metadata.matchNumber && climbCount.teams.includes(result._id.teamNumber))[match.climb])
        const harmonyCount = matchingClimbCounts.filter(e => e > 1).length;
        console.log('Team:', result._id.teamNumber, harmonyCount, matchingMatches)
        const harmonyResult = result.harmonyRate = harmonyCount / matchingMatches.length;
        superAverageAndMax(harmonyResult)
    })

    // matchApp.aggregate([
    //     {$group:{
    //         _id: null,
    //         match: {$push: result},
    //         harmmony: {$push: harmonyRate}
    //     }}
    // ])
    

    console.log(result.map(e => e.harmonyRate))

    return result;
}

async function superAverageAndMax(harmony: number):Promise<SuperDataAggregations[]> {
    
    return (await superApp.aggregate([
        {$group:{
            _id: null,
            avgFouls: {$avg: {$add:['$fouls.inBot', '$fouls.damageBot', '$fouls.tipEntangBot', '$fouls.pinBot', '$fouls.podiumFoul', '$fouls.zoneFoul', '$fouls.stageFoul', 'fouls.overExtChute']}},
            maxFouls: {$max: {$add:['$fouls.inBot', '$fouls.damageBot', '$fouls.tipEntangBot', '$fouls.pinBot', '$fouls.podiumFoul', '$fouls.zoneFoul', '$fouls.stageFoul', 'fouls.overExtChute']}},
            harmonyRate: {$push: {harmony}}
        } satisfies { [K in keyof SuperDataAggregations]: unknown }}
    ]))

}

export { averageAndMax, superAverageAndMax} 