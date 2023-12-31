import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

// If DEV is true then the app should forward requests to localhost:5173 instead of serving from /static
const DEV = process.env.NODE_ENV === 'dev';

const app = express();

// Since this is the fallback is must go after all other routes
if (DEV) {
    app.use('/', createProxyMiddleware('http://localhost:5173', { ws: true }));
} else {
    app.use(express.static('static'));

    app.get('/', (_, res) => {
        res.sendFile('static/index.html');
    });
}

export { app };
