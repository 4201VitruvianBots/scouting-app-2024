import { PropsWithChildren, createContext, useState } from "react";
import { RobotPosition } from "server/requests"

const ScouterNameContext = createContext ('')
const SetScouterNameContext = createContext <(ScouterName:string) => void> (()=>{})
const AllianceContext = createContext <RobotPosition> ('blue_1')
const SetAllianceContext = createContext <(Alliance:RobotPosition) => void> (()=>{})

function SignInProvider ({children}: PropsWithChildren){
    const [scouterName, setscouterName] = useState('')
    const [alliance, setalliance] = useState <RobotPosition> ('blue_1')
    return <ScouterNameContext.Provider value={scouterName}>
        <SetScouterNameContext.Provider value={setscouterName}>
            <AllianceContext.Provider value={alliance}>
            <SetAllianceContext.Provider value={setalliance}>
                {children}
            </SetAllianceContext.Provider>
            </AllianceContext.Provider>
        </SetScouterNameContext.Provider>
    </ScouterNameContext.Provider>
}
export {ScouterNameContext, SetScouterNameContext, AllianceContext, SetAllianceContext, SignInProvider}