import { MaterialSymbol } from 'react-material-symbols';

function PositionCell({
    scouter,
}: {
    scouter: { schedule: number; real: number[] } | boolean;
}) {
    const isBoolean = typeof scouter === 'boolean';
    return (
        <td
            className={`w-auto border-2 border-slate-700 text-center ${(isBoolean ? scouter : scouter.real.length > 0) ? 'bg-amber-400' : ''}`}>
            {isBoolean ? (
                scouter && <MaterialSymbol icon='check' />
            ) : scouter.real.length === 0 ? (
                scouter.schedule
            ) : scouter.real.length === 1 ? (
                scouter.real[0]
            ) : (
                <MaterialSymbol icon='warning' />
            )}
        </td>
    );
}
export default PositionCell;
