import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"

//check if production
const isProduction = process.env.NODE_ENV === "production";
//set local db url for development 
const dbUrl = isProduction? process.env.DB_URL || "" : "mongodb://127.0.0.1:27017/dailyplanner";
if(!isProduction) {
    dotenv.config();
}

//log on error 
mongoose.connect(dbUrl).then( val =>{
    console.log("Connected to the database");
    
} ).catch(error =>{
    if(error){
        console.log(error);
        console.log("There has been error connecting to the database");
    }
})

const app = express();
app.use(cors())



app.get("/", (req,res) =>{
    res.send("Ok hello there");
})

app.get("/api", (req,res) =>{
    res.send("successfull response")
})
const port =  process.env.port || 3000;

app.listen(port, () =>{
    console.log("Listening on port: ",port);
})