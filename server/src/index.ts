const express = require('express');
require('dotenv').config();
import { AppDataSource } from './data-source';
import authRouter from './router/auth-router';
import gameRouter from './router/game-router';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorMiddleware from './midlewares/error-middleware';

const app = express();

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(async () => {
    console.log(`Database init success!`);
  })
  .catch((error) => console.log(error));

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/game', gameRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
