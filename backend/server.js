const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');



dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://trial-of-craft-task-manager.vercel.app'
];

app.use(express.json());




const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // this line is crucial





app.use('/api/auth', require('./routes/auth'));

app.use('/api/projects', require('./routes/projects'));

app.use('/api/tasks', require('./routes/tasks'));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
