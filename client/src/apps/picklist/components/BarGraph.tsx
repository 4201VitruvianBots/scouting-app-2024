import { BarChart, BarSeries, ChartDataShape, ColorSchemeType } from 'reaviz';
import { AnalysisEntry, BarGraphData } from '../data';
import { TeamData } from 'requests';

function BarGraph({
    table,
    data,
    teamInfoJson,
}: {
    table: BarGraphData;
    data: AnalysisEntry[];
    teamInfoJson: TeamData;
}) {
    const entries = data.map<ChartDataShape>(e => {
        return {
            key: e.teamNumber.toString(),
            data: e[table.column] as number,
        };
    });
    const sortedEntries = entries.sort(
        (a, b) => (a.data as number) - (b.data as number)
    );
    if (!table.ascending) sortedEntries.reverse();

    if (table.top < sortedEntries.length) {
        sortedEntries.splice(table.top);
    }

    // Create a list of colors for each team based on the colors stored in team_info.json
    const sortedTeamNumbers = sortedEntries.map(entry => entry.key as string);

    let teamColors: ColorSchemeType = sortedTeamNumbers.map(() => '#7f7f7f');

    try {
        teamColors = sortedTeamNumbers.map(
            teamNumber => teamInfoJson[teamNumber].primaryHex
        );
        return (
            <BarChart
                data={entries}
                series={<BarSeries colorScheme={teamColors} />}
            />
        );
    } catch (e) {
        return <BarChart data={entries} />;
    }
}

export default BarGraph;
