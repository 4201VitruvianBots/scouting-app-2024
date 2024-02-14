import { Application } from 'express';
import expressWs from 'express-ws'



function setUpSocket(expressApp: Application) {
    const {app} = expressWs(expressApp);
    app.ws('/status/scouter',(ws, req)=> {
        ws.on('message', (msg)=> {
            console.log(msg);
        });
    });
};

export {setUpSocket};