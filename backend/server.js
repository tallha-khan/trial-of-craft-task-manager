const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');



dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://trial-of-craft-task-manager.vercel.app'],
  credentials: true,
}));

app.use(express.json());


app.use('/api/auth', require('./routes/auth'));

app.use('/api/projects', require('./routes/projects'));

app.use('/api/tasks', require('./routes/tasks'));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
