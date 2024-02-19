import { MatchDataAggregations } from "requests";
import { matchApp } from "./Schema.js";


async function averageAndMax(): Promise<MatchDataAggregations[]> {
    return (await matchApp.aggregate([{
        $group: {
            _id: { teamNumber: '$metadata.robotTeam' },
            averageTeleSpeakerNotes: { $avg: { $add: ['$teleNotes.near', '$teleNotes.mid', '$teleNotes.far'] } },
            averageTeleAmpNotes: { $avg: '$teleNotes.amp' },
            averageAutoSpeakerNotes: { $avg: { $add: ['$autoNotes.near', '$autoNotes.mid', '$autoNotes.far'] } },
            averageAutoAmpNotes: { $avg: '$autoNotes.amp' },
            averageTrapNotes: { $avg: '$trapNotes' },
            maxTeleSpeakerNotes: { $max: { $add: ['$teleNotes.near', '$teleNotes.mid', '$teleNotes.far'] } },
            maxTeleAmpNotes: { $max: '$teleNotes.amp' },
            maxAutoSpeakerNotes: { $max: { $add: ['$autoNotes.near', '$autoNotes.mid', '$autoNotes.far'] } },
            maxAutoAmpNotes: { $max: '$autoNotes.amp' },
            maxTrapNotes: { $max: '$trapNotes' }
        } satisfies { [K in keyof MatchDataAggregations]: unknown }
    }]));
}

export { averageAndMax, } 
