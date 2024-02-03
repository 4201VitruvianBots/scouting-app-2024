import { Dispatch, SetStateAction, useState } from 'react';
import { ClimbPosition } from 'requests';
import MultiButton from './MultiButton';
import Checkbox from './Checkbox';

function EndgameButton({
    setClimb,
    climbPosition
} : {
    setClimb: Dispatch<SetStateAction<ClimbPosition>>;
    climbPosition: ClimbPosition;
}) {
    const [alliance, setAlliance] = useState(false); //false=red, true=blue, null=hollow purple

    const handleClimb = (
        newClimb: ClimbPosition
    ) => {
        setClimb(newClimb);
    };

    const handleImage = () => {
        setAlliance(!alliance);
    };

    return(
        <>
            <Checkbox checked={alliance} onChange={handleImage}>Toggle Map Button</Checkbox>
            <div>
                <MultiButton onChange={handleClimb} value={climbPosition} 
                labels={['', '', '', 'Failed', 'None', 'Parked']}
                values={['amp', 'center', 'source', 'failed', 'none', 'park']} />
                {/* className={alliance ? [] : []} */} {/* This is to add styling later */}
            </div>
        </>
    );
}

export default EndgameButton
