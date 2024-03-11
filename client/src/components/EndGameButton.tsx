import { Dispatch, SetStateAction } from 'react';
import { MatchScores } from '../apps/match/MatchApp';
import { ClimbPosition, ScouterPosition } from 'requests';
import MultiButton from './MultiButton';

function EndgameButton({
    setClimb,
    setCount,
    climbPosition,
    alliance,
    scouterPosition,
    count,
}: {
    setClimb: Dispatch<SetStateAction<ClimbPosition>>;
    setCount: Dispatch<SetStateAction<MatchScores>>;
    climbPosition: ClimbPosition;
    alliance: boolean | undefined;
    scouterPosition: ScouterPosition | undefined;
    count: MatchScores;
}) {
    // const [alliance, setAlliance] = useState(false); //false=red, true=blue, null=hollow purple

    const handleClimb = (newClimb: ClimbPosition) => {
        setClimb(newClimb);
    };

    const handleTrap = () => {
        setCount(prevCount => ({
            ...prevCount,
            ['trap']: prevCount['trap'] + 1,
        }));
    }

    return (
        <>
            <div
                className={`relative flex h-[40em] w-[40em] flex-row gap-2 bg-cover bg-center py-2`}>
                <div
                    className={`${alliance ? 'bg-field-blue-endgame' : 'bg-field-red-endgame'} ${scouterPosition === 'red_right' ? 'rotate-180' : ''} absolute top-20 flex h-[40em] w-[40em] bg-cover bg-center`}>
                    <MultiButton
                        onChange={handleClimb}
                        value={climbPosition}
                        labels={['', '', '']}
                        values={['amp', 'center', 'source']}
                        className={
                            alliance
                                ? [
                                      /*blue*/ 'absolute left-[18em] top-[16em] h-[29em] w-[4em] rotate-60',

                                      'absolute left-[2em] top-[6em] h-[29em] w-[4em]',

                                      'absolute left-[18em] top-[-3em] h-[29em] w-[4em] -rotate-60',
                                  ]
                                : [
                                      /*red*/ 'absolute left-[18em] top-[15em] h-[29em] w-[4em] -rotate-60',

                                      'absolute right-[1em] top-[5.5em] h-[29em] w-[4em]',

                                      'absolute bottom-4 left-[19em] top-[-4em] h-[29em] w-[4em] rotate-60',
                                  ]
                        }
                    />
                </div>

                <MultiButton
                    onChange={handleClimb}
                    value={climbPosition}
                    labels={['Failed', 'None', 'Parked']}
                    values={['failed', 'none', 'park']}
                    className={[
                        'h-[60px] w-[217px] text-4xl ',
                        'h-[60px] w-[217px] text-4xl ',
                        'flex-column h-[60px] w-[217px] gap-4 text-4xl  ',
                    ]}
                />
            </div>
            <div className = 'flex justify-center pt-24'>
            <button onClick={() => { if (count.trap < 3) handleTrap() }} style={{ fontSize: '30px'}}
                        className='px-2 py-1 text-center bg-blue-300 rounded-md'>
                        Trap Notes: {count.trap}
                    </button>
            </div>
        </>
    );
}

export default EndgameButton;
