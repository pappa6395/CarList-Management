// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import carRoutes from './routes/carRoutes.js';
import { errorMiddleware } from './errorMiddleware.js';


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/cars', carRoutes);

app.get('/', (req, res) => {
    res.send('Hello from Car Registration API!');
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log('Server running on port 8000'));
  })
  .catch((err) => console.error(err));
