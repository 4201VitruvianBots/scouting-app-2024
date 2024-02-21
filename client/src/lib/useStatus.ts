import { useEffect, useRef, useState } from "react";
import { RobotPosition, SuperPosition, StatusReport, StatusRecieve } from "requests";
import { useBattery } from "./useBattery";


function useStatus(robotPosition:RobotPosition|SuperPosition|undefined, matchNumber:number|undefined, scouterName:string) {
    const socket = useRef<WebSocket>();

    // Store the current status
    const battery = useBattery()
    const status = useRef<StatusReport>();
    status.current = { robotPosition, matchNumber, scouterName, battery };

    useEffect(() => {
        // Create a new websocket
        socket.current = new WebSocket(`ws://${window.location.host}/status/scouter`)

        // As soon as it opens
        socket.current.onopen = () => {
            // Send the current status
            socket.current?.send(JSON.stringify(status.current))
        }

        // Close the socket for cleanup
        return () => {
            if (socket.current?.readyState === WebSocket.OPEN) {
                socket.current?.close();
            } else if (socket.current) {
                socket.current.onopen = () => {
                    socket.current?.close();
                }
            }
        }
    }, []);

    useEffect(() => {
        if (socket.current?.readyState !== WebSocket.OPEN)
            return
        
        socket.current?.send(JSON.stringify(status.current))
    },[matchNumber, robotPosition, scouterName, battery])
        
};

function useStatusRecieve() {
    const socket = useRef<WebSocket>();

    // State to store the status
    const [state, setState] = useState<StatusRecieve>({ matches: [], scouters: [] });

    useEffect(() => {
        // Create a new websocket
        socket.current = new WebSocket(`ws://${window.location.host}/status/admin`);

        // When data is recieved
        socket.current.onmessage = event => {
            // Update the state
            setState(JSON.parse(event.data));
        }

        // Close the socket for cleanup
        return () => {
            if (socket.current?.readyState === WebSocket.OPEN) {
                socket.current?.close();
            } else if (socket.current) {
                socket.current.onopen = () => {
                    socket.current?.close();
                }
            }
        }
    }, []);

    // Return the state so it can be used
    return state;
};

export { useStatus, useStatusRecieve };