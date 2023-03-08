import express from "express";

const app = express();
console.log("Hello wold");


const port =  process.env.port || 3000;

app.get("/", (req,res) =>{
    res.send("Ok");
})

app.listen(port, () =>{
    console.log("Listening on port: ",port);
})