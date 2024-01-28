import { Dispatch, SetStateAction, useState } from 'react';
import { ToggleButtonGroup, styled } from '@mui/material';
import MuiToggleButton from '@mui/material/ToggleButton';
import { ClimbPosition } from 'requests';



function EndgameButton({
    climbPosition,
    setClimbPosition,
}: {
    climbPosition: ClimbPosition;
    setClimbPosition: Dispatch<SetStateAction<ClimbPosition>>;
}) {
    const [allianceBlue, setAllianceBlue] = useState(false); //false=blue, true=red


    const handleImage = () => {
        setAllianceBlue(!allianceBlue);
    };

    const ToggleButton1 = styled(MuiToggleButton)({
        '&.Mui-selected, &.Mui-selected:hover': {
            color: 'white',
            backgroundColor: '#3268a8',
        },
    });

    const ToggleButton2 = styled(MuiToggleButton)({
        '&, &:hover':{
            backgroundColor: '#a6b2bf'
        },
        '&.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: '#48c55c',
        },
    });
    
    const handleClimbPosition = (
        _event: React.MouseEvent<HTMLElement>,
        newClimbPosition: ClimbPosition,
    ) => {
        setClimbPosition(newClimbPosition);
    }

    return (
        <>
            <ToggleButton1
                value='check'
                selected={allianceBlue}
                onChange={handleImage}
                className='bg-red-400 font-serif'>
                Toggle Map Color
            </ToggleButton1>

            <div
                className={`${allianceBlue ? 'bg-field-blue-endgame' : 'bg-field-red-endgame'} h-[40em] w-[40em] bg-cover bg-center object-contain brightness-75`}>
                {allianceBlue ? (
                    <>
                      <ToggleButtonGroup
                      value = {climbPosition} 
                      exclusive
                      onChange={handleClimbPosition}
                      >
                     <ToggleButton2 value="amp"
                     sx={{
                        position: "absolute",
                        top: "18em",
                        left: "22em",
                        rotate: "60deg",
                    backgroundColor:'fuchsia',
                    height: '29em',
                    width: '4em'
    }} >
                     </ToggleButton2>
                     <ToggleButton2 value="center" 
                     sx={{
                        position: "absolute",
                        top: "8em",
                        left: "3em",
                    backgroundColor:'fuchsia',
                    height: '29em',
                    width: '4em'
    }}>

    </ToggleButton2>
                     <ToggleButton2 value="source"
                     sx={{
                        position: "absolute",
                        top: "-1em",
                        left: "22em",
                        rotate: "-60deg",
                    backgroundColor:'fuchsia',
                    height: '29em',
                    width: '4em'
    }} >
                     </ToggleButton2>
                     <ToggleButton2 value="parked">
                        Parked
                     </ToggleButton2>
                     <ToggleButton2 value="none">
                        None
                     </ToggleButton2>
                     <ToggleButton2 value="failed">
                        Failed</ToggleButton2>
                      </ToggleButtonGroup>
                    </>
                ) : (
                    <>
                      <ToggleButtonGroup
                      value = {climbPosition} 
                      exclusive
                      onChange={handleClimbPosition}
                      >
                     <ToggleButton2 value="amp"  
                     sx={{
                        position: "absolute",
                        top: "19em",
                        left: "21em",
                        rotate: "-60deg",
                    backgroundColor:'fuchsia',
                    height: '29em',
                    width: '4em'
    }} ></ToggleButton2>
                     <ToggleButton2 value="center"
                      sx={{
                        position: "absolute",
                        top: "8em",
                        right: "2em",
                    backgroundColor:'fuchsia',
                    height: '29em',
                    width: '4em'
    }}>

    </ToggleButton2>
                     <ToggleButton2 value="source"
                      sx={{
                        position: "absolute",
                        top: "-4em",
                        left: "22em",
                        rotate: "60deg",
                    backgroundColor:'fuchsia',
                    height: '29em',
                    width: '4em'
                    }}>

                    </ToggleButton2>
                     <ToggleButton2 value="parked">
                        Parked
                     </ToggleButton2>
                     <ToggleButton2 value="none">
                        None
                     </ToggleButton2>
                     <ToggleButton2 value="failed">
                        Failed</ToggleButton2>
                    
                      </ToggleButtonGroup>
                    </>
                )}

               

                <br />
            </div>
           
        </>
    );
}

export default EndgameButton;
