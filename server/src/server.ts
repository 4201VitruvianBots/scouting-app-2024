import express from 'express';
import proxy from 'express-http-proxy';

// If DEV is true then the app should forward requests to localhost:5173 instead of serving from /static
const DEV = process.env.NODE_ENV === 'dev';

const app = express();

if (DEV) {
    app.use(
        '/',
        proxy('http://localhost:5173', { proxyReqPathResolver: e => e.url })
    );
} else {
    app.use(express.static('static'));
}

export { app };
