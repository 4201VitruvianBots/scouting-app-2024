import { StatusRecieve } from 'requests';
import MatchRow from './MatchRow';

function MatchTable({ matches }: { matches: StatusRecieve['matches'] }) {
    return (
        <table className='match-status h-72 overflow-auto'>
            <thead>
                <tr>
                    <th>Match</th>
                    <th className='status-red col-span-1'>Red 1</th>
                    <th className='status-red col-span-1'>Red 2</th>
                    <th className='status-red col-span-1'>Red 3</th>
                    <th className='status-red col-span-1'>Red SS</th>
                    <th className='status-blue col-span-1'>Blue 1</th>
                    <th className='status-blue col-span-1'>Blue 2</th>
                    <th className='status-blue col-span-1'>Blue 3</th>
                    <th className='status-blue col-span-1'>Blue SS</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(matches).map(([matchNumber, scouters]) => (
                    <MatchRow matchNumber={matchNumber} scouters={scouters} />
                ))}
            </tbody>
        </table>
    );
}

export { MatchTable };
