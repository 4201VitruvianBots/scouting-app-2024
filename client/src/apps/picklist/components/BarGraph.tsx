import { BarChart, BarSeries, ChartDataShape, ColorSchemeType } from 'reaviz';
import { AnalysisEntry, BarGraphData, TeamColorEntry } from '../data';
import { useFetchJson } from '../../../lib/useFetchJson';

function BarGraph({
    table,
    data,
}: {
    table: BarGraphData;
    data: AnalysisEntry[];
}) {
    const entries = data.map<ChartDataShape>(e => {return {key: e.teamNumber.toString(), data: e[table.column] as number}});
    const sortedEntries = entries.sort((a, b) => (a.data as number) - (b.data as number));
    if (!table.ascending) sortedEntries.reverse();
    
    if (table.top < sortedEntries.length) {
        sortedEntries.splice(table.top);
    }

    // Create a list of colors for each team based on the colors stored in team_colors.json
    const teamColorsJson = useFetchJson<TeamColorEntry>('/team_colors.json');
    const sortedTeamNumbers = sortedEntries.map(entry => entry.key as string);
    
    let teamColors: ColorSchemeType = sortedTeamNumbers.map(() => '#7f7f7f');
    
    if (teamColorsJson !== undefined) teamColors = sortedTeamNumbers.map(teamNumber => teamColorsJson[teamNumber].primaryHex);
    
    return <BarChart data={entries} series={<BarSeries colorScheme={teamColors} />} />;
}

export default BarGraph;