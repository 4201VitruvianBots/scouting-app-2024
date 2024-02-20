import { MatchDataAggregations } from "requests";






function StatRow({teams, stat, data}:{teams:(number | undefined)[], stat:Exclude<keyof MatchDataAggregations, '_id'>, data:MatchDataAggregations[] | undefined}) {
    const datapoints = teams.map(team => data?.find(dataTeam => team===dataTeam._id.teamNumber)?.[stat])
    return(
        <tr>
           <th className="border-4 border-slate-700">{stat}</th>
            {datapoints.map(dataNumbers => <td className={`${dataNumbers===0 ? 'bg-red-600' : ''} border-4 w-16 overflow-auto text-center border-slate-700`}>{dataNumbers}</td>)}
        </tr>
    )
} 

export default StatRow