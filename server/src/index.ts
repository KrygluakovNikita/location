import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import { AppDataSource } from "./data-source";

const app = express();

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(async () => {
    console.log(`Database init success!`);
  })
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
