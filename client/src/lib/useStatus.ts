import { useEffect, useRef, useState } from 'react';
import {
    RobotPosition,
    SuperPosition,
    StatusReport,
    StatusRecieve,
} from 'requests';
import { useBattery } from './useBattery';

function useStatus(
    robotPosition: RobotPosition | SuperPosition | undefined,
    matchNumber: number | undefined,
    scouterName: string
) {
    const socketRef = useRef<WebSocket>();

    // Store the current status
    const battery = useBattery();
    const status = useRef<StatusReport>();
    status.current = { robotPosition, matchNumber, scouterName, battery };

    useEffect(() => {
        try {
            // Create a new websocket
            const socket = new WebSocket(
                `ws://${window.location.host}/status/scouter`
            );
            socketRef.current = socket;

            // As soon as it opens
            socket.onopen = () => {
                // Send the current status
                socket.send(JSON.stringify(status.current));
            };

            // Close the socket for cleanup
            return () => {
                if (socket.readyState === WebSocket.OPEN) {
                    socket.close();
                } else if (socket) {
                    socket.onopen = () => {
                        socket.close();
                    };
                }
            };
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        if (socketRef.current?.readyState !== WebSocket.OPEN) return;

        socketRef.current?.send(JSON.stringify(status.current));
    }, [matchNumber, robotPosition, scouterName, battery]);
}

function useStatusRecieve() {
    const socketRef = useRef<WebSocket>();

    // State to store the status
    const [state, setState] = useState<StatusRecieve>({
        matches: [],
        scouters: [],
    });

    useEffect(() => {
        // Create a new websocket
        const socket = new WebSocket(
            `ws://${window.location.host}/status/admin`
        );
        socketRef.current = socket;

        // When data is recieved
        socket.onmessage = event => {
            // Update the state
            setState(JSON.parse(event.data));
        };

        // Close the socket for cleanup
        return () => {
            if (socket.readyState === WebSocket.OPEN) {
                socket.close();
            } else if (socket) {
                socket.onopen = () => {
                    socket?.close();
                };
            }
        };
    }, []);

    // Return the state so it can be used
    return state;
}

export { useStatus, useStatusRecieve };
