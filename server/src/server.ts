import express from 'express';

// If DEV is true then the app should forward requests to localhost:5173 instead of serving from /static
const DEV = process.env.NODE_ENV === 'dev';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

export { app };
