import { Dispatch } from "react";
import { MaterialSymbol } from "react-material-symbols";
import { TeamData } from "requests";
import { WindowData } from "../data";
import blankImage from "../../../images/blank.png";

function TeamItem(
    {
        teamNumber,
        teamInfoJson,
        onSubmit,
    }: {
            teamNumber: number;
            teamInfoJson: TeamData;
            onSubmit: Dispatch<WindowData>;
    }
) {
    // Handle when a team on the stat table is clicked
    function handleTeamSummaryClick(teamNumber: number) {
        onSubmit({title: "Team " + teamNumber + " Summary", type: 'TeamSummary', teamNumber: teamNumber});
    }
    
    return (
        <>
            {teamInfoJson[teamNumber] && (
                <td>
                    <img
                        src={
                            teamInfoJson[teamNumber]?.avatar
                                ? `data:image/png;base64,${teamInfoJson[teamNumber]?.avatar}`
                                : blankImage
                        }
                    />
                </td>
            )}
            <td>
                {teamNumber}
                {<button onClick={() => handleTeamSummaryClick(teamNumber)}>
                        <MaterialSymbol icon='info' />
                </button>}
            </td>
        </>
    );
}

export default TeamItem;
