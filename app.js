import express from 'express';
import router from './routes/routes.js';
import dotenv from "dotenv";
import {mongooseConnection} from "./config/dbConnection.js";

dotenv.config({ path: "./config/config.env"});

const app = express();

mongooseConnection();

//MiddleWare
app.use(express.json());
app.use(express.static(`../public`));

//Routes
app.use('/api/v1/tours', router);


app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}...`);
});