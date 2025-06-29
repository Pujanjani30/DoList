import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
// import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';

import './config/db.config.js';

import createApi from './api/v1/index.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(helmet());

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

app.use(cookieParser());

app.use(express.json({ limit: '10mb' }));

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

// app.use(mongoSanitize()); // currently not compatible with express v5

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: Date.now(),
    environment: process.env.NODE_ENV || 'development',
  });
});

app.use('/api/v1', createApi())

app.use(/(.*)/, (req, res) => {
  res.status(404).send('404 Not found');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;