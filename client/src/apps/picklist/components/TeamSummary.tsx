import base64toImage from '../../../lib/base64toImage';
import camelToSpaced from '../../../lib/camelCaseConvert';
import { useFetchJson } from '../../../lib/useFetchJson';
import { AnalysisEntry, TeamSummaryData, TeamInfoEntry } from '../data';

function TeamSummary({
    table,
    data,
}: {
    table: TeamSummaryData;
    data: AnalysisEntry[];
}) {
    
    // Get the data for the team specified
    const teamInfoJson = useFetchJson<TeamInfoEntry>('/team_info.json');
    const empty64x64Base64: string = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAAOUlEQVR42u3OIQEAAAACIP1/2hkWWEBzVgEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYF3YDicAEE8VTiYAAAAAElFTkSuQmCC";
    
    return (
        <>
        </>
    );
}

export default TeamSummary;
