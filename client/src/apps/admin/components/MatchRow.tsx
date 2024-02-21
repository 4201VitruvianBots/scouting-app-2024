import { RobotPosition, SuperPosition } from "requests";
import PositionCell from "./PositionCell";


function MatchRow ({matchNumber, scouters} : {matchNumber:string, scouters:Record<RobotPosition, {schedule: number, real:number[]}> & Record<SuperPosition, boolean>}){
    return(
        <tr>
            <th>
                {matchNumber}
            </th>
            <PositionCell scouter={scouters.red_1}/>
            <PositionCell scouter={scouters.red_2}/>
            <PositionCell scouter={scouters.red_3}/>
            {/* /*<PositionCell scouter={scouters.red_ss}/> */}
            <PositionCell scouter={scouters.blue_1}/>
            <PositionCell scouter={scouters.blue_2}/>
            <PositionCell scouter={scouters.blue_3}/>
            {/* <PositionCell scouter={scouters.blue_ss}/> */}
        </tr>
    )
}

export default MatchRow