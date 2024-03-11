import { Dispatch, useEffect, useState } from 'react';
import { RobotPosition, ScouterPosition, SuperPosition } from 'requests';
import MultiButton from './MultiButton';
import TextInput from './TextInput';


function SignIn({
    scouterName,
    onChangeScouterName,
    robotPosition,
    onChangeRobotPosition,
    superScouting,
    pitScouting,
    scouterPosition,
    onChangeScouterPosition,
    onSubmit,
}: {
    scouterName: string;
    onChangeScouterName: Dispatch<string>;
    onSubmit: () => void;
    scouterPosition?: ScouterPosition | undefined
    onChangeScouterPosition?: Dispatch<ScouterPosition>;
    
} & (
    | {
          superScouting: true;
          pitScouting?: false;
          robotPosition: SuperPosition | undefined;
          onChangeRobotPosition: Dispatch<SuperPosition>;

      }
    | {
          superScouting?: false;
          pitScouting?: false;

          robotPosition: RobotPosition | undefined;
          onChangeRobotPosition: Dispatch<RobotPosition>;

         
         
      }
    | {
          superScouting?: false;
          pitScouting: true;

          robotPosition?: undefined;
          onChangeRobotPosition?: undefined;

          
      }
)) {
    const [showCheck, setShowCheck] = useState<boolean>(false);

    function handleSubmit() {
        setShowCheck(true);
        onSubmit();
    }

    useEffect(() => {
        setShowCheck(false);
    }, [scouterName, robotPosition]);

    return (
        <>
            <div
                className={`grid w-[400px] auto-rows-fr grid-cols-2 bg-[#171c26] px-5 py-3
                    selection:box-border ${superScouting ? 'grid-rows-[auto_auto_1fr_1fr_auto]' : 
                    pitScouting ? 'grid-rows-[auto_auto_auto]' : 
                    'grid-rows-[auto_auto_1fr_1fr_1fr_0.5fr_1fr]'
                    } grid-flow-col justify-center gap-3`}
            >
                <p className='col-span-2 justify-self-center 
                p-1 text-2xl font-bold text-[#48c55c]'>
                    Sign-In
                </p>

                <TextInput
                    className='bg-[#171c26] required col-span-2 h-[40px] text-[#dee4f5]
                    justify-center text-xl outline outline-[#2f3646]'
                    value={scouterName}
                    onChange={onChangeScouterName}
                    placeholder='Name'>
                </TextInput>

                {superScouting ? (
                    <MultiButton
                        onChange={onChangeRobotPosition}
                        value={robotPosition}
                        labels={['Red', 'Blue']}
                        values={['red_ss', 'blue_ss']}
                        className={'text-xl'}
                        unSelectedClassName={[
                            'bg-[#2f3646] ',
                            'text-[#93C6D6] bg-[#2f3646]',
                        ]}
                        selectedClassName={[
                            'bg-[#D16666] text-black',
                            'bg-[#93C6D6] text-black',
                        ]}
                    />

                    
                ) : pitScouting ? undefined : (
                    <MultiButton
                        onChange={onChangeRobotPosition}
                        value={robotPosition}
                        labels={[
                            'Blue 1',
                            'Blue 2',
                            'Blue 3',
                            'Red 1',
                            'Red 2',
                            'Red 3',
                        ]}
                        values={[
                            'blue_1',
                            'blue_2',
                            'blue_3',
                            'red_1',
                            'red_2',
                            'red_3',
                        ]}
                        className={'text-xl rounded-lg'}
                        unSelectedClassName={[
                            'text-[#93C6D6] bg-[#2f3646]',
                            'text-[#93C6D6] bg-[#2f3646]',
                            'text-[#93C6D6] bg-[#2f3646]',
                            'text-[#D16666] bg-[#2f3646]',
                            'text-[#D16666] bg-[#2f3646]',
                            'text-[#D16666] bg-[#2f3646]',
                        ]}
                        selectedClassName={[
                            'bg-[#93C6D6] text-black',
                            'bg-[#93C6D6] text-black',
                            'bg-[#93C6D6] text-black',
                            'bg-[#D16666] text-black',
                            'bg-[#D16666] text-black',
                            'bg-[#D16666] text-black',
                        ]}
                    />
                )}

                {onChangeScouterPosition && (
                    <div className={`col-span-2 col-start-1 ${superScouting ? 'row-start-4' : 
                    'row-start-6'} grid  grid-cols-2 gap-4`}
                    >
                        <MultiButton
                            onChange={onChangeScouterPosition}
                            value={scouterPosition}
                            labels={['Blue on right', 'Red on right']}
                            values={['blue_right', 'red_right']}
                            className={'rounded-lg border-2  border-[#2f3646] text-xl mt-5'}
                            unSelectedClassName={'bg-[#2f3646] text-[#dee4f5]'}
                            selectedClassName={[
                                'bg-[#93C6D6] text-black border-[#93C6D6]',
                                'bg-[#D16666] text-black border-[#D16666]',
                            ]}>
                        </MultiButton>
                    </div>
                )} 

                <div
                    className={`col-span-2 flex  flex-row justify-self-center 
                    ${superScouting ? 'row-start-5' : pitScouting ? 'row-start-3' : 
                    'row-start-7'} col-start-1 `}
                >
                    <button
                        onClick={handleSubmit}
                        className={`bg-[#48c55c]  ${showCheck ? 'bg-[#48c55c]' : 'bg-'}  
                        m-3 justify-center rounded-md px-5 py-3 text-xl`}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
}

export default SignIn;

/* 
state variable - type for alliance already (in packages - robot position)
make state of type robot position
look at endgame button (fill in values, labels, and optionally, classnames)
*/
