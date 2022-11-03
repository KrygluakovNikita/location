const express = require('express');
require('dotenv').config();
import { AppDataSource } from './data-source';
const authRouter = require('./router/authRouter');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(async () => {
    console.log(`Database init success!`);
  })
  .catch(error => console.log(error));

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', authRouter);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
