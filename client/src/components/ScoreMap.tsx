import { ClimbPosition, ScouterPosition } from 'requests';
import { MatchScores } from '../apps/match/MatchApp';
import BlueFieldMap from  '../images/BlueFieldMap.png'
import RedFieldMap from '../images/RedFieldMap.png'
import { Dispatch, SetStateAction } from 'react';
import MultiButton from './MultiButton';

type countKeys = keyof MatchScores;

function ScoreMap({
    scouterPosition,
    climbPosition,
    handleCount,
    setClimb,
    alliance,
    teleop = false,
    count
} : {
    handleCount: (
        key: countKeys
    ) => void;
    setClimb?: Dispatch<SetStateAction<ClimbPosition>>;
    climbPosition?: ClimbPosition | undefined;
    scouterPosition: ScouterPosition | undefined;
    alliance: boolean | undefined; 
    teleop?: boolean;
    count: MatchScores;
}) {
    
    return(
        <div className={`relative pl-5 overflow-hidden 
        ${scouterPosition === 'red_right' ? 'rotate-180' : ''}`}>
            <img src={alliance ? BlueFieldMap : RedFieldMap} className='rounded z-0'/>
            <button onClick={() => handleCount(teleop ? 'teleSpeaker' : 'autoSpeaker')} 
                className={alliance ? 
                `bg-[#96c6d6] absolute right-1 top-[46%] text-4xl h-[15.5%] w-[13%]
                ${scouterPosition === 'red_right' ? 'rotate-180' : ''}`:
                `bg-[#D16666] absolute left-6 top-[46%] text-4xl h-[15.5%] w-[13%]
                ${scouterPosition === 'red_right' ? 'rotate-180' : ''}`
            }>
                {teleop ? count.teleSpeaker : count.autoSpeaker}
            </button>
            <button onClick={() => handleCount(teleop ? 'teleAmp' : 'autoAmp')} 
            className={alliance ? 
                `bg-[#96c6d6] absolute right-[24%] bottom-[0%] h-[8.5%] w-[19%] text-4xl
                ${scouterPosition === 'red_right' ? 'rotate-180' : ''}` : 
                `bg-[#D16666] absolute left-[27.7%] bottom-[0%] h-[8.5%] w-[19%] text-4xl
                ${scouterPosition === 'red_right' ? 'rotate-180' : ''}`
            }>
                {teleop ? count.teleAmp : count.autoAmp}
            </button>
            <button onClick={() => handleCount('trap')}
            className={setClimb ? 
            (alliance ? 
                `bg-[#96c6d6] absolute top-[27%] left-[14%] rounded
                ${scouterPosition === 'red_right' ? 'rotate-180' : ''}` : 
                `bg-[#D16666] absolute top-[27%] right-[11%] rounded
                ${scouterPosition === 'red_right' ? 'rotate-180' : ''}`) : 
                'bg-[#dee4f5] hidden'
            }>
                Trap Note: {count.trap}
            </button>
            <MultiButton onChange={setClimb?? (() => {})} 
            unSelectedClassName={setClimb ? 
                (alliance ? 'bg-[#96c6d6]' : 'bg-[#D16666]') : 'bg-[#dee4f5]'
            }
            selectedClassName='bg-[#a4ebaf]'
            className={alliance ? [
                'absolute top-[26.8%] left-[26.5%] rotate-60 w-[2%] h-[29.8%]', 
                'absolute top-[1.4%] left-[26.5%] -rotate-60 w-[2%] h-[29.8%]', 
                'absolute top-[14%] left-[6%] w-[2%] h-[29.8%]'
            ] : [
                'absolute top-[26.9%] right-[22.9%] -rotate-60 w-[2%] h-[29.8%]',
                'absolute top-[1.4%] right-[22.9%] rotate-60 w-[2%] h-[29.8%]',
                'absolute top-[14.1%] right-[2.4%] w-[2%] h-[29.8%]'
            ]}
            value={climbPosition} values={['amp', 'source', 'center']}
            labels={['', '', '']}/>
        </div>
    );
}

export default ScoreMap