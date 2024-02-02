import { Dispatch, SetStateAction, useState } from 'react';
import { styled } from '@mui/material';
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
            className={`${className} overflow-hidden text-7xl font-semibold  text-white first-letter:font-sans md:bg-opacity-55 `}
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
    leave,
    setLeave,
    teleop,
}: {
    count: MatchScores;
    setCount: Dispatch<SetStateAction<MatchScores>>;
    leave?: boolean;
    setLeave?: Dispatch<boolean>;
    teleop: boolean;
}) {
    const [allianceBlue, setAllianceBlue] = useState(false); //false=blue, true=red

    const [amplified, setAmplified] = useState(false); //false=off, true=on

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
        setLeave?.(!leave);
    };

    const ToggleButton1 = styled(MuiToggleButton)({
        '&.Mui-selected, &.Mui-selected:hover': {
            color: 'white',
            backgroundColor: '#3268a8',
        },
    });

    const ToggleButton2 = styled(MuiToggleButton)({
        '&.Mui-selected, &.Mui-selected:hover': {
            color: 'white',
            backgroundColor: '#f0cf00',
        },
    });

    const ToggleButton3 = styled(MuiToggleButton)({
        '&.Mui-selected, &.Mui-selected:hover': {
            color: 'white',
            backgroundColor: '#00cf00',
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
                    value='check'
                    selected={leave}
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
                className={`${allianceBlue ? 'bg-field-blue' : 'bg-field-red'} h-[40em] w-[40em] overflow-hidden bg-cover bg-center object-contain brightness-75`}>
                {allianceBlue ? (
                    <>
                        <RegionButton
                            count={count}
                            teleop={teleop}
                            className='absolute bottom-[40px] right-[-120px] z-20 h-2/5 w-2/5 overflow-hidden rounded-full bg-green-400/70 p-[0.5em] text-left  '
                            handleCount={handleCount}
                            autokey='autoNear'
                            telekey='teleNear'
                            akey='aNear'
                        />

                        <RegionButton
                            count={count}
                            teleop={teleop}
                            className='absolute left-[40%] top-[25%] z-10 h-[130%] w-[130%] overflow-hidden rounded-full bg-blue-400/70  p-[2em] pb-[8em] text-left '
                            handleCount={handleCount}
                            autokey='autoMid'
                            telekey='teleMid'
                            akey='aMid'
                        />

                        <RegionButton
                            count={count}
                            teleop={teleop}
                            className=' absolute bottom-0 right-0 z-0 h-full w-full bg-red-400/70 p-[2.5em] pb-[7em] text-left '
                            handleCount={handleCount}
                            autokey='autoFar'
                            telekey='teleFar'
                            akey='aFar'
                        />
                    </>
                ) : (
                    <>
                        <RegionButton
                            count={count}
                            teleop={teleop}
                            className='absolute bottom-[40px] left-[-120px] z-20 h-2/5 w-2/5 overflow-hidden rounded-full bg-green-400/70 p-[0.5em] text-right '
                            handleCount={handleCount}
                            autokey='autoNear'
                            telekey='teleNear'
                            akey='aNear'
                        />

                        <RegionButton
                            count={count}
                            teleop={teleop}
                            className='absolute right-[40%] top-[25%] z-10 h-[130%] w-[130%] overflow-hidden rounded-full bg-blue-400/70  p-[2em] pb-[8em] text-right '
                            handleCount={handleCount}
                            autokey='autoMid'
                            telekey='teleMid'
                            akey='aMid'
                        />
                        <RegionButton
                            count={count}
                            teleop={teleop}
                            className=' absolute bottom-0 right-0 z-0 h-full w-full bg-red-400/70 p-[2.5em] pb-[7em] text-right '
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

                    className='border-1 h-24 w-48 rounded-lg border border-gray-700 px-4 my-5 shadow-xl text-xl'
                    onClick={() => handleCount('autoAmp','teleAmp' )}>
                   
                    AMP Note: {count[teleop ? 'teleAmp' : 'autoAmp']}

            </button>
        </div>
    );
}

export default FieldButton;
