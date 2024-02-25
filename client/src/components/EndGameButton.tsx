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
           
            <div className={`${alliance ? 'bg-field-red-endgame' : 'bg-field-blue-endgame'} h-[40em] w-[40em] bg-cover bg-center relative `}>
                <MultiButton 
                onChange={handleClimb} value={climbPosition} 
                labels={['', '', '', 'Failed', 'None', 'Parked']}
                values={['amp', 'center', 'source', 'failed', 'none', 'park']}
                className={alliance
                
                ? [/*red*/  'absolute top-[15em] left-[18em] h-[29em] w-[4em] -rotate-60 ', 'absolute top-[5em] h-[29em] w-[4em] right-[2em] ', 'absolute top-[-5em] left-[18em] bottom-4 h-[29em] w-[4em] rotate-60', '', '', '' ]
                : [/*blue*/ 'absolute top-[14em] left-[18em] h-[29em] w-[4em] rotate-60', 'absolute top-[5em] left-[3em] h-[29em] w-[4em]', 'absolute top-[-4em] left-[18em] h-[29em] w-[4em] -rotate-60', '', '', ''] }/>
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
