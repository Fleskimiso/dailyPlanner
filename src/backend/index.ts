import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoDBConnect from "connect-mongo";
import path from "path";
import passport from "passport";
import passportLocal from "passport-local";
import { UserModel } from "./models/UserModel";
import { IUser } from "../common/types/User";
import userRouter from "./routes/user";
import plansRouter from "./routes/plans";



//check if production
const isProduction = process.env.NODE_ENV === "production";
// secret for the session
const secret = process.env.SECRET || "a secret";
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
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
//create session store
const sessionStore = MongoDBConnect.create({
    mongoUrl: dbUrl,
    touchAfter: 4*3600,
    crypto: {
        secret: secret
    }
});
//session config
const sessionConfig: session.SessionOptions = {
    secret: secret,
    saveUninitialized: true, 
    store: sessionStore,
    resave: true, 
    cookie: {
      maxAge: 1000 * 3600 * 24 * 3, // 3 days  for cookie to expire
      httpOnly: true,
      secure: isProduction ? true : false,
      sameSite: isProduction ? "none" : "lax",
    },
  
}
//initialize session
app.use(session(sessionConfig))
//initialize passport session
app.use(passport.initialize());
app.use(passport.session());
//initilize passport
passport.use(new passportLocal.Strategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

app.use("/api",userRouter);
app.use("/api",plansRouter);


const port =  process.env.port || 3000;

app.listen(port, () =>{
    console.log("Listening on port: ",port);
})