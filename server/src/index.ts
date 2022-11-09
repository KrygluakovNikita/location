const express = require('express');
require('dotenv').config();
import { AppDataSource } from './data-source';
import cors from 'cors';
import errorMiddleware from './middlewares/error-middleware';
import routes from './router/index';
import bodyParser from 'body-parser';

const app = express();

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(async () => {
    console.log(`Database init success!`);
  })
  .catch(error => console.log(error));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use('/api', routes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
