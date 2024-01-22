import mongoose from "mongoose";
import dotenv from 'dotenv';


export const mongooseConnection = async () => {

    await mongoose.connect(process.env.MONGO).then((connection) => {
        console.log('MongoDB Database connected with HOST:' + connection?.connection?.host);
    });

};

