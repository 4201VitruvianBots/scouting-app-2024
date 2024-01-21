import FieldButton from "../../components/FieldButton";
import BackHome from "../../components/BackHome";
import HomeIcon from '@mui/icons-material/Home';
import { useState } from "react";
type countKeys = keyof MatchScores;

interface MatchScores {
    autoNear: number,
    autoMid: number,
    autoFar: number,
    autoAmp: number,
    teleNear: number,
    teleMid: number,
    teleFar: number,
    teleAmp: number,
    trap: number,
    high: number,
    aNear: number, 
    aMid: number, 
    aFar: number
}

function MatchApp() {
    const [count, setCount] = useState<MatchScores>({
        autoNear: 0,
        autoMid: 0,
        autoFar: 0,
        autoAmp: 0,
        teleNear: 0,
        teleMid: 0,
        teleFar: 0,
        teleAmp: 0,
        trap: 0,
        high: 0,
        aNear: 0, 
        aMid: 0, 
        aFar: 0
    });
  
    const handleCount = (
        key: countKeys
    ) => {
       
        setCount(prevCount => ({
            ...prevCount,
            [key]: prevCount[key] + 1,
        }));
    };

    return (
        <>
            <p>Match Scouting App</p>
            
            <BackHome
                    link='/'
                    icon={
                        <HomeIcon style={{ fontSize: '30px' }} />
                    }>
                  
            </BackHome>
            <FieldButton count={count} setCount={setCount} teleop={false}/>
            <FieldButton count={count} setCount={setCount} teleop={true}/>

            
            <button
                className='border-1 h-24 w-48 rounded-lg border border-gray-700 px-4 shadow-xl'
                onClick={() => handleCount('high')}>
                {' '}
                High Note: {count.high}{' '}
            </button>
            <button
                className='border-1 h-24 w-48 rounded-lg border border-gray-700 px-4 shadow-xl'
                onClick={() => handleCount('trap')}>
                {' '}
                Trap Note: {count.trap}{' '}
            </button>
            
        </>
    );
}


export default MatchApp;
export type{MatchScores}
