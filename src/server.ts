require('dotenv').config();
import "reflect-metadata";
import { App } from "./app";
import { AppDataSource } from "./database/data-source";

AppDataSource.initialize().then(async () => {
  const server = new App();
  server.start();
}).catch (err => console.log(err));