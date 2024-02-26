import { Dispatch, SetStateAction} from 'react';
import { ClimbPosition } from 'requests';
import MultiButton from './MultiButton';


function EndgameButton({
    setClimb,
    climbPosition,
    alliance
} : {
    setClimb: Dispatch<SetStateAction<ClimbPosition>>;
    climbPosition: ClimbPosition;
    alliance: boolean | undefined;

}) {
    // const [alliance, setAlliance] = useState(false); //false=red, true=blue, null=hollow purple

    const handleClimb = (
        newClimb: ClimbPosition
    ) => {
        setClimb(newClimb);
    };

    // const handleImage = () => {
    //     setAlliance(!alliance);
    // };

    return(
        <>
            {/* <ToggleButton 
            className='shadow-md rounded-lg px-5'
            trueClassName='bg-blue-500'
            falseClassName='bg-red-700'
            value={alliance} 
            onChange={handleImage}>  
            Toggle Map Button 
            </ToggleButton> */}
           
            <div className= {`h-[40em] w-[40em] bg-cover bg-center relative flex w-[40em] flex-row gap-2 py-2`}>
                <div className={`${alliance ? 'bg-field-red-endgame' : 'bg-field-blue-endgame'} h-[40em] w-[40em] bg-cover bg-center absolute flex top-20`}>
                </div>
                <MultiButton 
                onChange={handleClimb} value={climbPosition} 
                labels={['', '', '', 'Failed', 'None', 'Parked']} 
                values={['amp', 'center', 'source', 'failed', 'none', 'park']} 
                className={alliance
                    ? [/*red*/  'absolute top-[20em] left-[18em] h-[29em] w-[4em] -rotate-60', 'absolute top-[10em] h-[29em] w-[4em] right-[1em]', 'absolute top-[1em] left-[18em] bottom-4 h-[29em] w-[4em] rotate-60', 'h-[60px] w-[210px] text-4xl ', 'h-[60px] w-[210px] text-4xl ', 'h-[60px] w-[210px] text-4xl' ] 
                    : [/*blue*/ 'absolute top-[20em] left-[18em] h-[29em] w-[4em] rotate-60', 'absolute top-[10em] left-[2em] h-[29em] w-[4em]', 'absolute top-[1em] left-[18em] h-[29em] w-[4em] -rotate-60', 'h-[60px] w-[217px] text-4xl ', 'h-[60px] w-[217px] text-4xl ', 'h-[60px] w-[217px] text-4xl flex-column gap-4  '] }/>
                
                
            </div>

        </> 
    );
}
/*
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

export default EndgameButton
