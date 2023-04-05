import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoDBConnect from "connect-mongo";
import passport from "passport";
import bcrypt from "bcrypt"
import passportLocal from "passport-local";
import { UserModel } from "./models/UserModel.js";
import userRouter from "./routes/user.js";
import plansRouter from "./routes/plans.js";



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
export const connection =  mongoose.connect(dbUrl).then( val =>{
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
//create strategy 

//Creating Local Strategy. passport-local-mongoose 3 lines of code for Strategy, 
//Serialiazation, Deserialization not working due to recent changes in Mongoose 7

passport.use(new passportLocal.Strategy((username,password,done)=>{  //done is a callback function
    try{
        UserModel.findOne({username:username}).then(user=>{
            if (!user){
                return done(null,false, {message:"Incorrect Username"})
            }
 //using bcrypt to encrypt passoword in register post route and compare function in login post round. 
 //login post route will check here during authentication so need to use compare here  
            bcrypt.compare(password,user.password,function(err,result){ 
                if (err){
                    return done(err)
                }

                if (result) {
                    return done(null,user)
                }
                else {
                    return done (null,false, {message:"Incorrect Password"})
                }
            })

        })
    }
    catch (err){
            return done(err)
    }

}))
//serialize user
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
//deserialize user  
passport.deserializeUser(function(id, done) {
    try {
        UserModel.findById(id).then(user=>{
            done(null,user);
        })
    }
    catch (err){
        done(err);
    }
  });
// passport.use(new passportLocal.Strategy(UserModel.authenticate()));
// passport.serializeUser(UserModel.serializeUser());
// passport.deserializeUser(UserModel.deserializeUser());

app.use("/api",userRouter);
app.use("/api",plansRouter);

app.get("/", (req,res) =>{
    res.send("Hello world");
});

const port =  process.env.port || 3000;

app.listen(port, () =>{
    console.log("Listening on port: ",port);
})
export const server = app;