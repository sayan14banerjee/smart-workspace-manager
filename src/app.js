import express from 'express';

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.send("Welcome to smart workspace manager")
});

export default app;