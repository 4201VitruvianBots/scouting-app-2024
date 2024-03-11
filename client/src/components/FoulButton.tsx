import { Dispatch, SetStateAction, useState } from 'react';
import { MatchScores } from '../apps/match/MatchApp';
import Checkbox from './Checkbox';
import { PickupLocation, ScouterPosition } from 'requests';
import MultiButton from './MultiButton';

// type countKeys = keyof MatchScores;

function FoulButton({
    handleCount,
    className,
    
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
