import { useEffect, useRef, useState } from "react";
import { RobotPosition, SuperPosition, StatusReport, StatusRecieve } from "requests";


function useStatus(robotPosition:RobotPosition|SuperPosition|undefined, matchNumber:number|undefined, scouterName:string) {
    const socket = useRef<WebSocket>();
    const state = useRef<StatusReport>();
    state.current = { robotPosition, matchNumber, scouterName, battery: 69 };

    useEffect(() => {
        socket.current = new WebSocket(`ws://${window.location.host}/status/scouter`)

        socket.current.onopen = () => {
            socket.current?.send(JSON.stringify(state.current))
        }

        return () => socket.current?.close();
    }, []);

    useEffect(() => {
        if (socket.current?.readyState !== WebSocket.OPEN)
            return
        
        socket.current?.send(JSON.stringify(state.current))
    },[matchNumber, robotPosition, scouterName])
        
};

function useStatusRecieve() {
    const [state, setState] = useState<StatusRecieve>({ matches: [], scouters: [] });

    const socket = useRef<WebSocket>();

    useEffect(() => {
        socket.current = new WebSocket(`ws://${window.location.host}/status/admin`);
        socket.current.onmessage = event => {
            setState(JSON.parse(event.data));
        }

        return () => socket.current?.close();
    }, []);

    return state;
};

export { useStatus, useStatusRecieve };
