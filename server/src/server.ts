import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { matchApp } from './Schema.js';

// import { MatchData } from 'requests';

// If DEV is true then the app should forward requests to localhost:5173 instead of serving from /static
const DEV = process.env.NODE_ENV === 'dev';

const app = express();

app.use(express.json());

app.post('/data/match', async(req,res) => {
    
    const matchapp = new matchApp(req.body);
    const aMatchApp = await matchapp.save();

    // Debugging, remove later
    console.log(aMatchApp);

    res.end();
    
});

app.use(express.static('static'));

// Since this is the fallback is must go after all other routes
if (DEV) {
    app.use('/', createProxyMiddleware('http://localhost:5173', { ws: true }));
} else {
    app.use(express.static('../client/dist'));

    app.get('/', (_, res) => {
        res.sendFile('static/index.html');
    });
}

export { app };
