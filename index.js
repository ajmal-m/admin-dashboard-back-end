const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3000;

app.get("/", (req,res)=>{
    res.send("HI My Name is AJMAL");
})

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`)
})