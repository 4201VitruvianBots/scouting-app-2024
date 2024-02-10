import { Dispatch, SetStateAction, useState } from 'react';
import { MatchScores } from '../apps/match/MatchApp';
import Checkbox from './Checkbox';
import ToggleButton from './ToggleButton';

type countKeys = keyof MatchScores;

function RegionButton({
    handleCount,
    className,
    teleKey,
    autoKey,
    teleOp,
    count,
    label
} : {
    handleCount: (autokey: countKeys, telekey: countKeys, aKey?: countKeys) => void;
    className?: string;
    teleKey: countKeys;
    autoKey: countKeys;
    teleOp: boolean;
    count: MatchScores;
    label?: string;
}) {
    return(
        <button className={` ${className} text-5xl absolute`}
        onClick={() => handleCount(autoKey, teleKey)} id='one'>
            <p>{label && `${label}: `}{count[teleOp ? teleKey : autoKey]}</p>
        </button>
    );
};

function FieldButton({
    setLeave,
    setCount,
    teleOp,
    leave,
    count
} : {
    setLeave?: Dispatch<boolean>;
    setCount: Dispatch<SetStateAction<MatchScores>>;
    teleOp: boolean;
    leave?: boolean;
    count: MatchScores;
}) {
    const [alliance, setAlliance] = useState(false); // false=red, true=blue, null=hollow purple

    const handleCount = (
        autoKey: countKeys,
        teleKey: countKeys
    ) => {
        const finalKey = teleOp ? teleKey : autoKey;
        setCount(prevCount => ({
            ...prevCount,
            [finalKey]: prevCount[finalKey] + 1
        }));
    };

    const handleImage = () => {
        setAlliance(!alliance);
    };
    const handleLeave = () => {
        setLeave?.(!leave);
    };

    return(
        <>
            <div>
                <ToggleButton value={alliance} onChange={handleImage} className={`${alliance ? 'bg-blue-500' : 'bg-red-500'} px-2 py-1  rounded-md`}>Toggle Map Color</ToggleButton>
                {!teleOp && (
                    <Checkbox checked={leave} onChange={handleLeave} className='text-2xl p-4' boxClassName='w-6 h-6'>
                       {' '}Robot has {leave ? `left` : `not left`}
                    </Checkbox>
                )}
            </div>
            <div className={`${alliance ? 'bg-field-blue' : 'bg-field-red'} h-[40em] w-[40em] overflow-hidden bg-cover bg-center object-contain brightness-75 mx-auto`}>
                {alliance ? (
                    <>
                        <RegionButton teleOp={teleOp} count={count} handleCount={handleCount}
                        autoKey='autoNear' teleKey='teleNear' className='absolute bottom-[40px] right-[-120px] z-20 h-2/5 w-2/5 overflow-hidden rounded-full bg-green-400/70 p-[0.5em] text-left' />
                        <RegionButton teleOp={teleOp} count={count} handleCount={handleCount}
                        autoKey='autoMid' teleKey='teleMid'  className='absolute left-[30%] top-[25%] z-10 h-[130%] w-[130%] overflow-hidden rounded-full bg-blue-400/70  p-[2em] pb-[8em] text-left '/>
                        <RegionButton teleOp={teleOp} count={count} handleCount={handleCount}
                        autoKey='autoFar' teleKey='teleFar'  className='absolute bottom-0 right-0 z-0 h-full w-full bg-red-400/70 p-[2.5em] pb-[7em] text-left '/>
                    </>
                ) : (
                    <>
                        <RegionButton teleOp={teleOp} count={count} handleCount={handleCount}
                        autoKey='autoFar' teleKey='teleFar' className='bottom-0 right-0 z-0 h-full w-full bg-red-400/70 p-[2.5em] pb-[6em] text-right '/>
                        <RegionButton teleOp={teleOp} count={count} handleCount={handleCount}
                        autoKey='autoMid' teleKey='teleMid'  className='right-[40%] top-[25%] z-10 h-[130%] w-[130%] overflow-hidden rounded-full bg-blue-400/70  p-[2em] pb-[9em] text-right '/>
                        <RegionButton teleOp={teleOp} count={count} handleCount={handleCount}
                        autoKey='autoNear' teleKey='teleNear'  className='bottom-[40px] left-[-120px] z-20 h-2/5 w-2/5 overflow-hidden rounded-full bg-green-400/70 p-[1.25em] text-right ' />
                    </>
                )}
            </div>
            <div className='w-[40em] flex-row flex'>
            <RegionButton teleOp={teleOp} count={count} handleCount={handleCount}
                        autoKey='autoAmp' teleKey='teleAmp'  className='bg-yellow-200 h-[100px] !static flex-grow basis-0' label='Amp'/>
            <RegionButton teleOp={teleOp} count={count} handleCount={handleCount}
                        autoKey='autoMiss' teleKey='teleMiss'  className='bg-purple-200 h-[100px] !static flex-grow basis-0' label='Miss'/>
            </div>
        </>
    );
}

export default FieldButton