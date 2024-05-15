import { RobotPosition, StatusReport, SuperPosition } from 'requests';
import { ScouterCard } from './ScouterCard';

function ScouterTable({ scouters }: { scouters: StatusReport[] }) {
    const sortedScouter = Object.fromEntries(
        (
            [
                'red_1',
                'red_2',
                'red_3',
                'blue_1',
                'blue_2',
                'blue_3',
                'red_ss',
                'blue_ss',
            ] satisfies (RobotPosition | SuperPosition)[]
        ).map(robotPosition => [
            robotPosition,
            scouters.filter(scouter => scouter.robotPosition === robotPosition),
        ])
    ) as Record<RobotPosition | SuperPosition, StatusReport[]>;

    return (
        <div className='grid grid-cols-4 gap-2'>
            <ScouterCard scouter={sortedScouter.red_1} title='Red 1' red />
            <ScouterCard scouter={sortedScouter.red_2} title='Red 2' red />
            <ScouterCard scouter={sortedScouter.red_3} title='Red 3' red />
            <ScouterCard scouter={sortedScouter.red_ss} title='Red SS' red />
            <ScouterCard scouter={sortedScouter.blue_1} title='Blue 1' />
            <ScouterCard scouter={sortedScouter.blue_2} title='Blue 2' />
            <ScouterCard scouter={sortedScouter.blue_3} title='Blue 3' />
            <ScouterCard scouter={sortedScouter.blue_ss} title='Blue SS' />
        </div>
    );
}

export { ScouterTable };
