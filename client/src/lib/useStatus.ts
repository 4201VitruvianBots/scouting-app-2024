import { useEffect, useRef } from "react";
import { RobotPosition, SuperPosition, StatusReport } from "requests";


function useStatus(robotPosition:RobotPosition|SuperPosition|undefined, matchNumber:number|undefined, scouterName:string) {
    const socket = useRef<WebSocket>();

    


    useEffect(() => {
        socket.current = new WebSocket(`ws://${window.location.host}/status/scouter`)
    },[]);



    useEffect(() => {
        console.log(socket.current)
        if (socket.current?.readyState !== WebSocket.OPEN)
            return
        
        socket.current?.send(JSON.stringify({robotPosition, matchNumber, scouterName, battery:69}satisfies StatusReport))
    },[matchNumber, robotPosition, scouterName])
        
};

export{useStatus};