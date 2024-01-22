import fs from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Tour from "../models/tourModel.js";
import data from "../dev-data/data/tours.js";


const seeder = async () => {

  try{
    await mongoose.connect("mongodb://localhost:27017/tour").then(conn => {
      console.log("Connected to" + conn);
    });
  
    await Tour.deleteMany().then(() => {
      console.log("Deleted");
    });
  
    await Tour.insertMany(data).then(() => {
      console.log("Inserted data to database");
      process.exit();
    })
  } catch(error)
  {
    console.log(error.message);
    process.exit();
  } 

};

seeder();
