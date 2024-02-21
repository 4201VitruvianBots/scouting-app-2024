import { StatusRecieve } from "requests"
import MatchRow from "./MatchRow"


function MatchTable({matches}:{matches : StatusRecieve['matches']}) {
    
 return(
<table className="match-status">
                    <thead><tr>
                        <th>Match</th>
                        <th className="status-red">Red 1</th>
                        <th className="status-red">Red 2</th>
                        <th className="status-red">Red 3</th>
                        <th className="status-red">Red SS</th>
                        <th className="status-blue">Blue 1</th>
                        <th className="status-blue">Blue 2</th>
                        <th className="status-blue">Blue 3</th>
                        <th className="status-blue">Blue SS</th>
                    </tr></thead>
                    <tbody>
                        {Object.entries(matches).map(([matchNumber, scouters]) => <MatchRow matchNumber={matchNumber} scouters={scouters}/>)}
                    </tbody>
                </table>
 )   
}

export {MatchTable}