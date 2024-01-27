import { Dispatch, SetStateAction, useState } from 'react';
import {styled} from '@mui/material';
import MuiToggleButton from '@mui/material/ToggleButton';
import { MatchScores } from '../apps/match/MatchApp';
type countKeys = keyof MatchScores;


function RegionButton({
    count,
    teleop,
    className,
    handleCount,
    autokey,
    telekey,
    akey,
}: {
    count: MatchScores;
    teleop: boolean;
    className: string;
    handleCount: (
        autokey: countKeys,
        telekey: countKeys,
        aKey?: countKeys
    ) => void;
    autokey: countKeys;
    telekey: countKeys;
    akey: countKeys;
}) {
    return (
        <button
            className={`${className} h-full w-1/3 overflow-hidden text-6xl font-semibold  text-white first-letter:font-sans md:bg-opacity-50 `}
            onClick={() => handleCount(autokey, telekey, akey)}
            id='one'>
            <p>{count[teleop ? telekey : autokey]}</p>
            {teleop && (
                <p className='m-[10px] text-[20px]'>AMP: {count[akey]}</p>
            )}
        </button>
    );
}

function FieldButton({
    count,
    setCount,
    teleop,
}: {
    count: MatchScores;
    setCount: Dispatch<SetStateAction<MatchScores>>;
    teleop: boolean;
}) {
    const [allianceBlue, setAllianceBlue] = useState(false); //false=blue, true=red

    const [amplified, setAmplified] = useState(false); //false=off, true=on
    
    const [leave, setLeave] = useState(false); //false=notleft, true=left

    const handleCount = (
        autokey: countKeys,
        telekey: countKeys,
        aKey?: countKeys
    ) => {
        const finalKey = teleop
            ? aKey && amplified
                ? aKey
                : telekey
            : autokey;
        amplified == true && aKey;
        setCount(prevCount => ({
            ...prevCount,
            [finalKey]: prevCount[finalKey] + 1,
        }));
    };

    const handleImage = () => {
        setAllianceBlue(!allianceBlue);
    };

    const handleAmplified = () => {
        setAmplified(!amplified);
    };

    const handleLeave = () => {
        setLeave(!leave)
    }

    const ToggleButton1 = styled(MuiToggleButton)({
        '&.Mui-selected, &.Mui-selected:hover': {
            color: 'white',
            backgroundColor: '#3268a8',
        },
    });

    const ToggleButton2 = styled(MuiToggleButton)({
        '&.Mui-selected, &.Mui-selected:hover': {
            color: 'white',
            backgroundColor: '#00ff00',
        },
    });

    const ToggleButton3 = styled(MuiToggleButton)({
        '&.Mui-selected, &.Mui-selected:hover': {
            color: 'white',
            backgroundColor: '#00ff00',
        },
    });

    return (
        <div>
            <ToggleButton1
                value='check'
                selected={allianceBlue}
                onChange={handleImage}
                className='bg-red-400 font-serif'>
                Toggle Map Color
            </ToggleButton1>

            {!teleop && (
            <ToggleButton3
                value = 'check'
                selected = {leave}
                onChange={handleLeave}
                className={`${leave ? 'bg-yellow-300' : 'bg-slate-500'} font-serif`}>
                Robot has {leave ? 'left' : 'not left'}

            </ToggleButton3>
            )}
            {teleop && (
                <ToggleButton2
                    value='check'
                    onChange={handleAmplified}
                    selected={amplified}
                    className={`${amplified ? 'bg-yellow-300' : 'bg-slate-500'} font-serif`}>
                    Amp {amplified ? 'On' : 'Off'}
                    {/* {amplified ? <>Amp <span>On</span></> : 'Amp Off'} */}
                </ToggleButton2>
            )}

            <div
                className={`${allianceBlue ? 'bg-field-blue' : 'bg-field-red'} align-center flex h-[40em] w-[40em] flex-row bg-cover bg-center object-contain brightness-75`}>
                {allianceBlue ? (
                    <>
                        <RegionButton
                            count={count}
                            teleop={teleop}
                            className='bg-red-400'
                            handleCount={handleCount}
                            autokey='autoFar'
                            telekey='teleFar'
                            akey='aFar'
                        />
                        <RegionButton
                            count={count}
                            teleop={teleop}
                            className='bg-green-400'
                            handleCount={handleCount}
                            autokey='autoNear'
                            telekey='teleNear'
                            akey='aNear'
                        />
                        <RegionButton
                            count={count}
                            teleop={teleop}
                            className='bg-blue-400'
                            handleCount={handleCount}
                            autokey='autoMid'
                            telekey='teleMid'
                            akey='aMid'
                        />
                    </>
                ) : (
                    <>
                        <RegionButton
                            count={count}
                            teleop={teleop}
                            className='bg-blue-400'
                            handleCount={handleCount}
                            autokey='autoMid'
                            telekey='teleMid'
                            akey='aMid'
                        />
                        <RegionButton
                            count={count}
                            teleop={teleop}
                            className='bg-green-400'
                            handleCount={handleCount}
                            autokey='autoNear'
                            telekey='teleNear'
                            akey='aNear'
                        />
                        <RegionButton
                            count={count}
                            teleop={teleop}
                            className='bg-red-400'
                            handleCount={handleCount}
                            autokey='autoFar'
                            telekey='teleFar'
                            akey='aFar'
                        />


                    </>
                )}

               

                <br />
            </div>
            <button
                    className='border-1 h-24 w-48 rounded-lg border border-gray-700 px-4 shadow-xl'
                    onClick={() => handleCount('autoAmp','teleAmp' )}>
                   
                    AMP Note: {count[teleop ? 'teleAmp' : 'autoAmp']}
            </button>
        </div>
    );
}

export default FieldButton;
