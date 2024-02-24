import { Dispatch, useEffect, useState } from 'react';
import { RobotPosition, ScouterPosition, SuperPosition } from 'requests';
import MultiButton from './MultiButton';

import TextInput from './TextInput';

// const [teamNumber, setTeamNumber] = useState<number>();
//     const [matchNumber, setMatchNumber] = useState(1);

function SignIn({
    scouterName,
    onChangeScouterName,
    robotPosition,
    onChangeRobotPosition,
    superScouting,
    scouterPosition,
    onChangeScouterPosition,
    onSubmit,
}: {
    scouterName: string;
    onChangeScouterName: Dispatch<string>;
    scouterPosition: ScouterPosition | undefined
    onChangeScouterPosition: Dispatch<ScouterPosition>;
    onSubmit: () => void;
} & (
    | {
          superScouting: true;
          robotPosition: SuperPosition | undefined;
          onChangeRobotPosition: Dispatch<SuperPosition>;
      }
    | {
          superScouting?: false;
          robotPosition: RobotPosition | undefined;
          onChangeRobotPosition: Dispatch<RobotPosition>;
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
        < >
       
            <div
                className={`grid w-[400px] auto-rows-fr grid-cols-2 selection:box-border ${superScouting ? 'grid-rows-[auto_auto_1fr_1fr]' : 'grid-rows-[auto_auto_1fr_1fr_1fr_0.5fr_1fr]'} grid-flow-col justify-center gap-3`}>
                <p className='col-span-2 justify-self-center p-1 text-2xl font-medium text-green-600'>
                    Sign-In
                </p>
                <TextInput
                    className=' required col-span-2 h-[40px] justify-center text-xl text-black outline-double outline-sky-300 '
                    value={scouterName}
                    onChange={onChangeScouterName}
                    placeholder='Name'></TextInput>

                {superScouting ? (
                    <MultiButton
                        onChange={onChangeRobotPosition}
                        value={robotPosition}
                        labels={['Red', 'Blue']}
                        values={['red_ss', 'blue_ss']}
                        className={'text-xl'}
                        unSelectedClassName={[
                            'text-red-500 bg-gray-300 ',
                            'text-blue-500 bg-gray-300',
                        ]}
                        selectedClassName={[
                            'bg-red-500 text-white',
                            'bg-blue-500 text-white',
                        ]}
                    />
                ) : (
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
                        className={'text-xl'}
                        unSelectedClassName={[
                            'text-blue-500 bg-gray-300',
                            'text-blue-500 bg-gray-300',
                            'text-blue-500 bg-gray-300',
                            'text-red-500 bg-gray-300 ',
                            'text-red-500 bg-gray-300',
                            'text-red-500 bg-gray-300',
                            
                        ]}
                        selectedClassName={[
                            'bg-blue-500 text-white',
                            'bg-blue-500 text-white',
                            'bg-blue-500 text-white',
                            'bg-red-500 text-white',
                            'bg-red-500 text-white',
                            'bg-red-500 text-white',
                           
                        ]}
                    />
                )}
            
            <div className='grid grid-cols-2 gap-4 row-start-6  col-start-1 col-span-2'>
                <MultiButton
                    onChange={onChangeScouterPosition}
                    value={scouterPosition}
                    labels={['Blue on right', 'Red on right' ]}
                    values={['blue_right', 'red_right' ]}
                    className={'text-xl rounded-lg  border-2'}
                    unSelectedClassName={'bg-gray-200 text-black'}
                    selectedClassName={[
                        'bg-blue-300 text-black border-blue-800',
                        'bg-red-300 text-black border-red-800'
                      

                    ]
                       
                    }></MultiButton>
            </div>

            <div
                className={`col-span-2 flex  flex-row justify-self-center ${superScouting ? 'row-start-4' : 'row-start-7'} col-start-1 `}>
                <button
                    onClick={handleSubmit}
                    className={` ${showCheck ? 'bg-green-500' : 'bg-gray-300'}  m-3 justify-center rounded-md bg-gray-300  px-5  py-3 text-xl hover:bg-green-500`}>
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
