import { AnalysisEntry, ScatterPlotData } from '../data';
import { Scatter } from 'react-chartjs-2';
import { Series } from '../util';
import {
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip,
} from 'chart.js';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

function ScatterPlot({
    value,
    data,
}: {
    value: ScatterPlotData;
    data: AnalysisEntry[];
}) {
    const series = Series(data);
    const points = data.map(entry => ({
        x: entry[value.xColumn],
        y: entry[value.yColumn],
    }));

    return (
        <Scatter
            data={{
                labels: series.teamNumber,
                datasets: [
                    { label: 'Data', data: points, backgroundColor: '#00ff00' },
                ],
            }}
            options={{
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            }}
        />
    );
}

export default ScatterPlot;
