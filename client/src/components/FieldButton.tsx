import { Dispatch, SetStateAction } from 'react';
import { MatchScores } from '../apps/match/MatchApp';
import { ScouterPosition } from 'requests';
import MultiButton from './MultiButton';

type countKeys = keyof MatchScores;

function RegionButton({
    handleCount,
    className,
    teleKey,
    autoKey,
    teleOp,
    count,
    label,
    scouterPosition,
    textClassName = '',
}: {
    handleCount: (
        autokey: countKeys,
        telekey: countKeys,
        aKey?: countKeys
    ) => void;
    className?: string;
    teleKey: countKeys;
    autoKey: countKeys;
    teleOp: boolean;
    count: MatchScores;
    label?: string;
    scouterPosition?: ScouterPosition | undefined;
    textClassName?: string;
}) {
    return (
        <button
            className={` ${className} absolute text-5xl `}
            onClick={() => handleCount(autoKey, teleKey)}
            id='one'>
            <p
                className={`${scouterPosition === 'red_right' ? 'rotate-180' : ''} ${textClassName}  `}>
                {label && `${label}: `}
                {count[teleOp ? teleKey : autoKey]}
            </p>
        </button>
    );
}

function FieldButton({
    setLeave,
    setCount,
    teleOp,
    leave,
    count,
    alliance,
    scouterPosition,
}: {
    setLeave?: Dispatch<boolean>;
    setCount: Dispatch<SetStateAction<MatchScores>>;
    teleOp: boolean;
    leave?: boolean;
    count: MatchScores;
    alliance: boolean | undefined;
    scouterPosition: ScouterPosition | undefined;
}) {


    const handleCount = (autoKey: countKeys, teleKey: countKeys) => {
        if (teleOp || !count.hold){
            const finalKey = teleOp ? teleKey : autoKey;
            setCount(prevCount => ({
                ...prevCount,
                [finalKey]: prevCount[finalKey] + 1,
            }));
        }
    };

    const handleLeave = () => {
        setLeave?.(!leave);
    };

    const fieldColors = alliance ? ['bg-blue-300/70', 'bg-blue-500/70', 'bg-blue-700/70'] : ['bg-red-200/70', 'bg-red-400/70', 'bg-red-600/70'];

    return (
        <>
            <div className='flex items-center justify-center gap-2 py-2'>
                {!teleOp && (
                    <>
                        <div className='flex-col items-center justify-center pr-3'>
                            <h1 className='text-4xl'>Mobility? </h1> 
                            <p>The robot must cross the gray<br/> line to earn mobility.</p>
                        </div>
                        <MultiButton
                            className='h-[100px] flex-grow flex-row basis-0 text-4xl'
                            value={leave}
                            values={[true, false]}
                            labels={['Yes', 'No']}
                            onChange={handleLeave}
                        />
                    </>
                )}
            </div>

            <div
                className={`${alliance ? 'bg-field-blue' : 'bg-field-red'} ${scouterPosition === 'red_right' ? 'rotate-180' : ''} mx-auto h-[40em] w-[40em] overflow-hidden bg-cover bg-center object-contain brightness-75 transition-[filter] duration-200
                    ${!teleOp && count.hold ? 'grayscale' : ''}`}>
                {alliance ? (
                    <>
                        <RegionButton
                            teleOp={teleOp}
                            count={count}
                            handleCount={handleCount}
                            autoKey='autoShootNear'
                            teleKey='teleShootNear'
                            className={`absolute bottom-[40px] right-[-120px] z-20 h-2/5 w-2/5 overflow-hidden rounded-full text-left ${fieldColors[2]}`}
                            textClassName='top-[2.2em] left-[1.5em] absolute'
                            scouterPosition={scouterPosition}
                        />
                        <RegionButton
                            teleOp={teleOp}
                            count={count}
                            handleCount={handleCount}
                            autoKey='autoShootMid'
                            teleKey='teleShootMid'
                            className={`absolute left-[30%] top-[25%] z-10 h-[130%] w-[130%] overflow-hidden rounded-full text-left ${fieldColors[1]}`}
                            textClassName='top-[3.5em] left-[3.5em] absolute'
                            scouterPosition={scouterPosition}
                        />
                        <RegionButton
                            teleOp={teleOp}
                            count={count}
                            handleCount={handleCount}
                            autoKey='autoShootFar'
                            teleKey='teleShootFar'
                            className={`absolute bottom-0 right-0 z-0 h-full w-full bg-green-200/70 text-left ${fieldColors[0]}`}
                            textClassName='top-[3.5em] left-[3em] absolute'
                            scouterPosition={scouterPosition}
                        />
                    </>
                ) : (
                    <>
                        <RegionButton
                            teleOp={teleOp}
                            count={count}
                            handleCount={handleCount}
                            autoKey='autoShootFar'
                            teleKey='teleShootFar'
                            className={`bottom-0 right-0 z-0 h-full w-full p-[2.5em] text-right ${fieldColors[0]}`}
                            textClassName='top-[3.5em] right-[3em] absolute'
                            scouterPosition={scouterPosition}
                        />
                        <RegionButton
                            teleOp={teleOp}
                            count={count}
                            handleCount={handleCount}
                            autoKey='autoShootMid'
                            teleKey='teleShootMid'
                            className={`right-[30%] top-[25%] z-10 h-[130%] w-[130%] overflow-hidden rounded-full text-right ${fieldColors[1]}`}
                            textClassName='top-[3.25em] right-[3.5em] absolute'
                            scouterPosition={scouterPosition}
                        />
                        <RegionButton
                            teleOp={teleOp}
                            count={count}
                            handleCount={handleCount}
                            autoKey='autoShootNear'
                            teleKey='teleShootNear'
                            className={`bottom-[40px] left-[-120px] z-20 h-2/5 w-2/5 rounded-full text-right ${fieldColors[2]}`}
                            textClassName='top-[2.2em] right-[1.5em] absolute'
                            scouterPosition={scouterPosition}
                        />
                    </>
                )}
            </div>

            <div
                className={`flex w-[40em] flex-row gap-2 py-2 transition-[filter] duration-200 
                ${!teleOp && count.hold ? 'grayscale' : ''}`}>
                {(
                    <>
                        <RegionButton
                            teleOp={teleOp}
                            count={count}
                            handleCount={handleCount}
                            autoKey='autoAmp'
                            teleKey='teleAmp'
                            className='!static h-[100px] flex-grow basis-0 bg-orange-200'
                            label='Amp'
                        />
                        <RegionButton
                            teleOp={teleOp}
                            count={count}
                            handleCount={handleCount}
                            autoKey='autoMiss'
                            teleKey='teleMiss'
                            className='!static h-[100px] flex-grow basis-0 bg-red-200'
                            label='Miss'
                        />
                        {!teleOp && (
                            <RegionButton
                                teleOp={teleOp}
                                count={count}
                                handleCount={handleCount}
                                autoKey='hold'
                                teleKey='hold'
                                className='!static h-[100px] flex-grow basis-0 bg-yellow-200'
                                label='Held'
                            />
                        )}
                    </>
                )}
            </div>
        </>
    );
}

export default FieldButton;
