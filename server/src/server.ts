import express from 'express';
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { matchApp, pitApp, superApp } from './Schema.js';
import {averageAndMax, superAverageAndMax, robotImageDisplay} from './aggregate.js'
import { importAllData } from './transfer.js';
import { setUpSocket, updateMatchStatus } from './status.js';
import { PitFile, PitResult } from 'requests';
import { dataUriToBuffer } from 'data-uri-to-buffer';


// import { MatchData } from 'requests';

// If DEV is true then the app should forward requests to localhost:5173 instead of serving from /static
const DEV = process.env.NODE_ENV === 'dev';
const REMOTE = process.env.LOCATION === 'remote';

const app = express();

app.use(express.json({limit: '200mb'}));

setUpSocket(app);

app.post('/data/match', async(req,res) => {
    
    const matchapp = new matchApp(req.body);
    const aMatchApp = await matchapp.save();
    updateMatchStatus()

    // Debugging, remove later
    console.log(aMatchApp);

    res.end();
    
});

app.post('/data/super', async(req,res) => {

    const SuperApp = new superApp(req.body);
    const aSuperApp = await SuperApp.save();

    console.log(aSuperApp);

    res.end();
});

app.post('/data/pit', async(req,res) => {
    
    const body = req.body as PitFile;

    const PitApp = new pitApp({
        ...body,
        photo: dataUriToBuffer(body.photo),
    });
    const aPitApp = await PitApp.save();

    console.log(aPitApp);

    res.end();
});

if (REMOTE) {
    app.post('/data/sync', async (req, res) => {
        await importAllData(req.body);
        res.end();
    })
}


app.get('/data/retrieve', async (req, res) => {
    res.send(await averageAndMax());

})

app.get('/data/retrieve/super', async (req, res) => {
    res.send(await superAverageAndMax());
})

app.get('/data/pit/scouted-teams', async (req, res) => {
    res.send((await pitApp.find({}, {teamNumber: 1})).map(e => e.teamNumber));
})

app.get('/image/:teamId.jpeg', async (req, res) => {
    const { teamId } = req.params;
    console.log(teamId);

    //Search the pit scouting database for info on this teamId
    const teamNumber = parseInt(teamId);

    if (isNaN(teamNumber)) {
        res.status(400);
        res.send('Query was not a number');
        return;
    }

    const imageData = await robotImageDisplay(teamNumber);

    //If the Image data DOES NOT exists:
    if (!imageData) {
        //  Return a 404 response
        res.status(404)
        res.sendFile(path.resolve('static/fallback.png'))
        return;
    }

    res.contentType('image/jpeg');
     //  Return the image data
    res.send(imageData);
})

app.get('/data/pit', async (req, res) => {
    const entries = await pitApp.find({}, {photo: 0});
    
    const result: PitResult = {};
    
    entries.forEach(entry => result[entry.teamNumber] = entry)
    
    res.send(result);
})

app.use(express.static('static'));

// Since this is the fallback is must go after all other routes
if (DEV) {
    app.use('/', createProxyMiddleware('http://localhost:5173', { ws: true }));
} else {
    app.use(express.static('../client/dist'));

    app.get('*', (_, res) => {
        res.sendFile(path.resolve('../client/dist/index.html'));
    });
}

export { app };
