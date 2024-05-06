import { MatchDataAggregations, SuperDataAggregations } from 'requests';
import { matchApp, superApp, pitApp } from './Schema.js';

async function averageAndMax(): Promise<MatchDataAggregations[]> {
    const climbCounts = await matchApp.aggregate([
        {
            $group: {
                _id: {
                    matchNumber: '$metadata.matchNumber',
                    alliance: {
                        $cond: [
                            {
                                $in: [
                                    '$metadata.robotPosition',
                                    ['red_1', 'red_2', 'red_3'],
                                ],
                            },
                            'red',
                            'blue',
                        ],
                    },
                },
                source: {
                    $sum: { $cond: [{ $eq: ['$climb', 'source'] }, 1, 0] },
                },
                center: {
                    $sum: { $cond: [{ $eq: ['$climb', 'center'] }, 1, 0] },
                },
                amp: {
                    $sum: { $cond: [{ $eq: ['$climb', 'amp'] }, 1, 0] },
                },
                teams: {
                    $push: '$metadata.robotTeam',
                },
            },
        },
    ]);
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

    const matches = await matchApp
        .find()
        .select('metadata.matchNumber metadata.robotTeam climb');

    const result = await matchApp.aggregate([
        {
            $group: {
                _id: { teamNumber: '$metadata.robotTeam' },
                averageTeleSpeakerNotes: {
                    $avg: {
                        $add: [
                            '$teleNotes.near',
                            '$teleNotes.mid',
                            '$teleNotes.far',
                        ],
                    },
                },
                averageTeleAmpNotes: { $avg: '$teleNotes.amp' },
                averageAutoSpeakerNotes: {
                    $avg: {
                        $add: [
                            '$autoNotes.near',
                            '$autoNotes.mid',
                            '$autoNotes.far',
                        ],
                    },
                },
                averageAutoAmpNotes: { $avg: '$autoNotes.amp' },
                averageTrapNotes: { $avg: '$trapNotes' },
                maxTeleSpeakerNotes: {
                    $max: {
                        $add: [
                            '$teleNotes.near',
                            '$teleNotes.mid',
                            '$teleNotes.far',
                        ],
                    },
                },
                maxTeleAmpNotes: { $max: '$teleNotes.amp' },
                maxAutoSpeakerNotes: {
                    $max: {
                        $add: [
                            '$autoNotes.near',
                            '$autoNotes.mid',
                            '$autoNotes.far',
                        ],
                    },
                },
                maxAutoAmpNotes: { $max: '$autoNotes.amp' },
                maxTrapNotes: { $max: '$trapNotes' },
                avgClimbRate: {
                    $avg: {
                        $cond: [
                            { $in: ['$climb', ['source', 'center', 'amp']] },
                            1,
                            { $cond: [{ $eq: ['$climb', 'failed'] }, 0, null] },
                        ],
                    },
                },
            } satisfies {
                [K in keyof Omit<
                    MatchDataAggregations,
                    'harmonyRate'
                >]: unknown;
            },
        },
    ]);

    result.forEach(result => {
        const matchingMatches = matches.filter(
            match => match.metadata.robotTeam === result._id.teamNumber
        );
        const matchingClimbCounts = matchingMatches.map(
            match =>
                climbCounts.find(
                    climbCount =>
                        climbCount._id.matchNumber ===
                            match.metadata.matchNumber &&
                        climbCount.teams.includes(result._id.teamNumber)
                )[match.climb]
        );
        const harmonyCount = matchingClimbCounts.filter(e => e > 1).length;
        result.harmonyRate = harmonyCount / matchingMatches.length;
    });

    return result;
}

async function superAverageAndMax(): Promise<SuperDataAggregations[]> {
    return await superApp.aggregate([
        {
            $group: {
                _id: { teamNumber: '$metadata.robotTeam' },
                avgFouls: {
                    $avg: {
                        $add: [
                            '$fouls.protectedZone',
                            '$fouls.multiplePieces',
                            '$fouls.insideRobot',
                            '$fouls.pinning',
                            '$fouls.other',
                        ],
                    },
                },
                maxFouls: {
                    $max: {
                        $add: [
                            '$fouls.protectedZone',
                            '$fouls.multiplePieces',
                            '$fouls.insideRobot',
                            '$fouls.pinning',
                            '$fouls.other',
                        ],
                    },
                },
            } satisfies { [K in keyof SuperDataAggregations]: unknown },
        },
    ]);
}

async function robotImageDisplay(
    teamNumber: number
): Promise<Buffer | undefined> {
    return (
        await pitApp.findOne({ teamNumber: teamNumber }, 'teamNumber photo')
    )?.photo;
}

export { averageAndMax, superAverageAndMax, robotImageDisplay };
