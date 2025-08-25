import express from 'express';
import userRoutes from "./routes/userRoutes.js";
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.send("Welcome to smart workspace manager")
});

// User routes
app.use('/user', userRoutes);

export default app;