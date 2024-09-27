import express from 'express';
// import path from 'path';
// import chalk from 'chalk';
// import { createProxyMiddleware } from 'http-proxy-middleware';

// import { dataUriToBuffer } from 'data-uri-to-buffer';

// import { MatchData } from 'requests';

// If DEV is true then the app should forward requests to localhost:5173 instead of serving from /static
// const DEV = process.env.NODE_ENV === 'dev';

const app = express();

app.use(express.json({ limit: '200mb' }));




export { app };
