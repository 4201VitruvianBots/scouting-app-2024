import { Dispatch, SetStateAction } from 'react';
import { ClimbPosition, ScouterPosition } from 'requests';
import MultiButton from './MultiButton';

function EndgameButton({
    setClimb,
    climbPosition,
    alliance,
    scouterPosition,
}: {
    setClimb: Dispatch<SetStateAction<ClimbPosition>>;
    climbPosition: ClimbPosition;
    alliance: boolean | undefined;
    scouterPosition: ScouterPosition | undefined;
}) {
    // const [alliance, setAlliance] = useState(false); //false=red, true=blue, null=hollow purple

    const handleClimb = (newClimb: ClimbPosition) => {
        setClimb(newClimb);
    };

    return (
        <>
            <div
                className={`relative flex h-[40em] w-[40em] flex-row gap-2 bg-cover bg-center py-2`}>
                <div
                    className={`${alliance ? 'bg-field-blue-endgame' : 'bg-field-red-endgame'} ${scouterPosition === 'red_right' ? 'rotate-180' : ''} absolute top-20 flex h-[40em] w-[40em] bg-cover bg-center`}></div>
                <MultiButton
                    onChange={handleClimb}
                    value={climbPosition}
                    labels={['', '', '', 'Failed', 'None', 'Parked']}
                    values={[
                        'amp',
                        'center',
                        'source',
                        'failed',
                        'none',
                        'park',
                    ]}
                    className={`
                        ${alliance
                            ? [
                                  /*blue*/ 'absolute left-[18em] top-[20em] h-[29em] w-[4em] rotate-60',
                                  'absolute left-[2em] top-[10em] h-[29em] w-[4em]',
                                  'absolute left-[18em] top-[1em] h-[29em] w-[4em] -rotate-60',
                                  'h-[60px] w-[217px] text-4xl ',
                                  'h-[60px] w-[217px] text-4xl ',
                                  'flex-column h-[60px] w-[217px] gap-4 text-4xl  ',
                              ]
                            : [
                                  /*red*/ 'absolute left-[18em] top-[20em] h-[29em] w-[4em] -rotate-60',
                                  'absolute right-[1em] top-[10em] h-[29em] w-[4em]',
                                  'absolute bottom-4 left-[18em] top-[1em] h-[29em] w-[4em] rotate-60',
                                  'h-[60px] w-[210px] text-4xl ',
                                  'h-[60px] w-[210px] text-4xl ',
                                  'h-[60px] w-[210px] text-4xl',
                              ]}
                              ${scouterPosition === 'red_right' ? 'rotate-180' : ''}
                    `}
                />
            </div>
        </>
    );
}
/*
alliance
? blue
: red


blue
    "amp"
        position: "absolute",
        top: "18em",
        left: "22em",
        rotate: "60deg",
        height: '29em',
        width: '4em'

    "center" 
        position: "absolute",
        top: "8em",
        left: "3em",
        height: '29em',
        width: '4em'
   
    "source"
        position: "absolute",
        top: "-1em",
        left: "22em",
        rotate: "-60deg",
        height: '29em',
        width: '4em'
red
    "amp:"
        position: "absolute",
        top: "19em",
        left: "21em",
        rotate: "-60deg",
        height: '29em',
        width: '4em'
        
    "center"
        position: "absolute",
        top: "8em",
        right: "2em",
        height: '29em',
        width: '4em'

    "source"
        position: "absolute",
        top: "-4em",
        left: "22em",
        rotate: "60deg",
        height: '29em',
        width: '4em'


*/

export default EndgameButton;
