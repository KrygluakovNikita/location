const express = require('express');
require('dotenv').config();
import { AppDataSource } from './data-source';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorMiddleware from './middlewares/error-middleware';
import routes from './router/index';

const app = express();

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(async () => {
    console.log(`Database init success!`);
  })
  .catch(error => console.log(error));

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use('/api', routes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
