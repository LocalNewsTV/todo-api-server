import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
mongoose.set('strictQuery', true);

mongoose.connect(process.env.DATABASE);

mongoose.connection.on('connected', () => {
  console.info("Successfully connected to Mongoose.")
});

mongoose.connection.on('error', (err) => {
  console.warn(`Mongoose connection error: ${err}`);
});

import './models/user-schema.js';
import './models/list-schema.js';