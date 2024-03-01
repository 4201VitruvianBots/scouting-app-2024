import { Dispatch, SetStateAction, useState } from 'react';
import { MatchScores } from '../apps/match/MatchApp';
import Checkbox from './Checkbox';
import { PickupLocation, ScouterPosition } from 'requests';
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
    const [pickupLocation, setPickupLocation] = useState<
        PickupLocation | undefined
    >();

    const heldFromAuto = count.hold && !(
        count.teleShootNear ||
        count.teleShootMid ||
        count.teleShootFar ||
        count.teleAmp ||
        count.teleMiss
    );

    const handleCount = (autoKey: countKeys, teleKey: countKeys) => {
        if (pickupLocation) {
            const finalKey = teleOp ? teleKey : autoKey;
            setCount(prevCount => ({
                ...prevCount,
                [finalKey]: prevCount[finalKey] + 1,
            }));
            const pickupKeys = {
                preload: 'autoPreload',
                pickup: 'autoPickup',
                speaker: 'telePickupSpeaker',
                middle: 'telePickupMiddle',
                source: 'telePickupSource',
            } as const;
            setCount(prevCount => ({
                ...prevCount,
                [pickupKeys[pickupLocation]]:
                    prevCount[pickupKeys[pickupLocation]] + 1,
            }));
        } else if ( 
            heldFromAuto && teleOp
        ) {
            const finalKey = teleOp ? teleKey : autoKey;
            setCount(prevCount => ({
                ...prevCount,
                [finalKey]: prevCount[finalKey] + 1,
            }));
        } else if (
            count.autoPreload ||
            (count.autoPickup && !count.hold && !teleOp)
        ) {
            const finalKey = teleOp ? teleKey : autoKey;
            const finalPickupLocation =
                pickupLocation == 'autoPreload' ? 'autoPreload' : 'autoPickup';
            setCount(prevCount => ({
                ...prevCount,
                [finalKey]: prevCount[finalKey] + 1,
                [finalPickupLocation]: prevCount[finalPickupLocation] + 1,
            }));
        }
        setPickupLocation(undefined);
    };

    const handleLeave = () => {
        setLeave?.(!leave);
    };

    return (
        <>
            <div className='flex items-center justify-center '>
                {!teleOp && (
                    <Checkbox
                        checked={leave}
                        onChange={handleLeave}
                        className='p-4 text-2xl'
                        boxClassName='w-6 h-6'>
                        {' '}
                        Did the robot leave?
                    </Checkbox>
                )}
            </div>

            <div className='flex w-[40em] flex-row gap-2 py-2'>
                {teleOp ? (
                    !heldFromAuto ? (
                        <MultiButton
                            values={['speaker', 'middle', 'source']}
                            onChange={setPickupLocation}
                            value={pickupLocation}
                            labels={[
                                `Speaker: ${count.telePickupSpeaker}`,
                                `Middle: ${count.telePickupMiddle}`,
                                `Source: ${count.telePickupSource}`,
                            ]}
                            className={`h-[100px] flex-grow basis-0 text-2xl ${pickupLocation == undefined ? 'bg-yellow-100' : ''}`}
                            unSelectedClassName={pickupLocation == undefined ? '' : 'bg-gray-300'}
                            selectedClassName = 'bg-yellow-300'
                        />
                    ) : (
                        <div className='grid h-[100px] flex-grow basis-0 place-items-center bg-yellow-300 text-2xl'>
                            Note held from auto
                        </div>
                    )
                ) : count.autoPreload || count.autoPickup ? (
                    <div className='h-[6.25em] w-[40em] bg-gray-300'></div>
                ) : (
                    <MultiButton
                        values={['preload', 'pickup']}
                        onChange={setPickupLocation}
                        value={pickupLocation}
                        labels={['Preload', 'Picked Up']}
                        className={`h-[100px] flex-grow basis-0 text-2xl ${pickupLocation == undefined ? 'bg-yellow-100' : ''}`}
                        unSelectedClassName={pickupLocation == undefined ? '' : 'bg-gray-300'}
                        selectedClassName = 'bg-yellow-300'
                    />
                )}
            </div>

            <div
                className={`${alliance ? 'bg-field-blue' : 'bg-field-red'} ${scouterPosition === 'red_right' ? 'rotate-180' : ''} mx-auto h-[40em] w-[40em] overflow-hidden bg-cover bg-center object-contain brightness-75 transition-[filter] duration-200
                    ${(pickupLocation == undefined) && ((!teleOp && ((!count.autoPreload && !count.autoPickup) || count.hold)) || (teleOp && !heldFromAuto)) ? 'grayscale' : ''}`}>
                {alliance ? (
                    <>
                        <RegionButton
                            teleOp={teleOp}
                            count={count}
                            handleCount={handleCount}
                            autoKey='autoShootNear'
                            teleKey='teleShootNear'
                            className='absolute bottom-[40px] right-[-120px] z-20 h-2/5 w-2/5 overflow-hidden rounded-full bg-green-400/70 text-left'
                            textClassName='top-[2.2em] left-[1.5em] absolute'
                            scouterPosition={scouterPosition}
                        />
                        <RegionButton
                            teleOp={teleOp}
                            count={count}
                            handleCount={handleCount}
                            autoKey='autoShootMid'
                            teleKey='teleShootMid'
                            className='absolute left-[30%] top-[25%] z-10 h-[130%] w-[130%] overflow-hidden rounded-full bg-blue-400/70   text-left '
                            textClassName='top-[3.5em] left-[3.5em] absolute'
                            scouterPosition={scouterPosition}
                        />
                        <RegionButton
                            teleOp={teleOp}
                            count={count}
                            handleCount={handleCount}
                            autoKey='autoShootFar'
                            teleKey='teleShootFar'
                            className='absolute bottom-0 right-0 z-0 h-full w-full bg-red-400/70 text-left '
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
                            className='bottom-0 right-0 z-0 h-full w-full bg-red-400/70 p-[2.5em] text-right '
                            textClassName='top-[3.5em] right-[3em] absolute'
                            scouterPosition={scouterPosition}
                        />
                        <RegionButton
                            teleOp={teleOp}
                            count={count}
                            handleCount={handleCount}
                            autoKey='autoShootMid'
                            teleKey='teleShootMid'
                            className='right-[30%] top-[25%] z-10 h-[130%] w-[130%] overflow-hidden rounded-full bg-blue-400/70 text-right '
                            textClassName='top-[3.25em] right-[3.5em] absolute'
                            scouterPosition={scouterPosition}
                        />
                        <RegionButton
                            teleOp={teleOp}
                            count={count}
                            handleCount={handleCount}
                            autoKey='autoShootNear'
                            teleKey='teleShootNear'
                            className='bottom-[40px] left-[-120px] z-20 h-2/5 w-2/5 rounded-full bg-green-400/70 text-right'
                            textClassName='top-[2.2em] right-[1.5em] absolute'
                            scouterPosition={scouterPosition}
                        />
                    </>
                )}
            </div>

            <div className={`flex w-[40em] flex-row gap-2 py-2 transition-[filter] duration-200
                ${(pickupLocation == undefined) && ((!teleOp && ((!count.autoPreload && !count.autoPickup) || count.hold)) || (teleOp && !heldFromAuto)) ? 'grayscale' : ''}`}>
                {count.hold === 0 || teleOp ? (
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
                                className='!static h-[100px] flex-grow basis-0 bg-green-300'
                                label='Held'
                            />
                        )}
                    </>
                ) : (
                    <div className='grid h-[100px] flex-grow basis-0 place-items-center bg-green-300 text-5xl grayscale-0'>
                        Held: 1
                    </div>
                )}
            </div>
        </>
    );
}

export default FieldButton;
