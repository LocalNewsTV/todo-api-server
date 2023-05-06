import './db.js';
import apiRouter from './routes/api-router.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import passport from 'passport';
import mongoSanitize from 'express-mongo-sanitize';

const app = express();

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(morgan('dev'));
app.use(cors());
app.use(rateLimit({
  windowMs: 60*1000*4,
  max: 400
}));
app.use(passport.initialize());
app.use(mongoSanitize({
  allowDots: true,
  replaceWith: "_"
}))

// Routing
app.get('/', (req, res) => {
res.send('Node.js Server is live!');
});
app.use('/api', apiRouter)
export default app;