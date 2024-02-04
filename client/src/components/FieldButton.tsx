import { Dispatch, SetStateAction, useState } from 'react';
import { MatchScores } from '../apps/match/MatchApp';
import Checkbox from './Checkbox';

type countKeys = keyof MatchScores;

function RegionButton({
    handleCount,
    className,
    teleKey,
    autoKey,
    teleOp,
    count,
    aKey
} : {
    handleCount: (autokey: countKeys, telekey: countKeys, aKey?: countKeys) => void;
    className?: string;
    teleKey: countKeys;
    autoKey: countKeys;
    teleOp: boolean;
    count: MatchScores;
    aKey: countKeys;
}) {
    return(
        <button className={className} 
        onClick={() => handleCount(autoKey, teleKey, aKey)} id='one'>
            <p>{count[teleOp ? teleKey : autoKey]}</p>
            {teleOp && (
                <p>AMP: {count[aKey]}</p>
            )}
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
    const [ampd, setAmpd] = useState(false); // false=off, true=on

    const handleCount = (
        autoKey: countKeys,
        teleKey: countKeys,
        aKey?: countKeys
    ) => {
        const finalKey = teleOp ? aKey && ampd ? aKey : teleKey : autoKey;
        ampd == true && aKey;
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
    const handleAmpd = () => {
        setAmpd(!ampd);
    };

    return(
        <>
            <div>
                <Checkbox checked={alliance} onChange={handleImage}>Toggle Map Color</Checkbox>
                {!teleOp && (
                    <Checkbox checked={leave} onChange={handleLeave}>
                       Robot has {leave ? `Left` : `Not Left`}
                    </Checkbox>
                )}
                {teleOp && (
                    <Checkbox checked={ampd} onChange={handleAmpd}>
                        Amp is {ampd ? 'ON' : 'OFF'}
                    </Checkbox>
                )}
            </div>
            <div>
                {alliance ? (
                    <>
                        <RegionButton teleOp={teleOp} count={count} handleCount={handleCount}
                        autoKey='autoNear' teleKey='teleNear' aKey='aNear'/>
                        <RegionButton teleOp={teleOp} count={count} handleCount={handleCount}
                        autoKey='autoMid' teleKey='teleMid' aKey='aMid'/>
                        <RegionButton teleOp={teleOp} count={count} handleCount={handleCount}
                        autoKey='autoFar' teleKey='teleFar' aKey='aFar'/>
                    </>
                ) : (
                    <>
                        <RegionButton teleOp={teleOp} count={count} handleCount={handleCount}
                        autoKey='autoFar' teleKey='teleFar' aKey='aFar'/>
                        <RegionButton teleOp={teleOp} count={count} handleCount={handleCount}
                        autoKey='autoMid' teleKey='teleMid' aKey='aMid'/>
                        <RegionButton teleOp={teleOp} count={count} handleCount={handleCount}
                        autoKey='autoNear' teleKey='teleNear' aKey='aNear'/>
                    </>
                )}
            </div>
            <button onClick={() => handleCount('autoAmp', 'teleAmp')}>
                    Amp Note: {count[teleOp ? 'teleAmp' : 'autoAmp']}
            </button>
        </>
    );
}

export default FieldButton