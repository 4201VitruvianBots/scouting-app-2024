import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { matchApp, pitApp, superApp } from './Schema.js';
import {averageAndMax} from './aggregate.js';
import { importAllData } from './transfer.js';
import { setUpSocket, updateMatchStatus } from './status.js';

// import { MatchData } from 'requests';

// If DEV is true then the app should forward requests to localhost:5173 instead of serving from /static
const DEV = process.env.NODE_ENV === 'dev';
const REMOTE = process.env.LOCATION === 'remote';

const app = express();

app.use(express.json());

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

    const PitApp = new pitApp(req.body);
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

app.use(express.static('static'));

// Since this is the fallback is must go after all other routes
if (DEV) {
    app.use('/', createProxyMiddleware('http://localhost:5173', { ws: true }));
} else {
    app.use(express.static('../client/dist'));

    app.get('*', (_, res) => {
        res.sendFile('../client/dist/index.html', {root: process.cwd()});
    });
}

export { app };
