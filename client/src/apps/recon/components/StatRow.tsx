import { MatchDataAggregations } from "requests";






function StatRow({teams, stat, data}:{teams:number[], stat:Exclude<keyof MatchDataAggregations, '_id'>, data:MatchDataAggregations[] | undefined}) {
    const datapoints = teams.map(team => data?.find(dataTeam => team===dataTeam._id.teamNumber)?.[stat])
    return(
        <tr>
           <th>{stat}</th>
            {datapoints.map(dataNumbers => <td>{dataNumbers}</td>)}
        </tr>
    )
} 

export default StatRow