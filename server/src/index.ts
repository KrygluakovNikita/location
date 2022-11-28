const express = require('express');
require('dotenv').config();
import { AppDataSource } from './data-source';
import cors from 'cors';
import errorMiddleware from './middlewares/error-middleware';
import routes from './router/index';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
const app = express();

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(async () => {
    console.log(`Database init success!`);
  })
  .catch(error => console.log(error));

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('public'));
app.use(cookieSession({ secret: process.env.GOOGLE_CLIENT_SECRET }));

app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PATCH,DELETE',
    credentials: true,
  })
);

app.use('/api', routes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
