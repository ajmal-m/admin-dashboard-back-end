const express = require("express");
const app = express();
const dotenv = require("dotenv");

const catgoryRouter = require("./routers/category-router");

dotenv.config();

const PORT = process.env.PORT || 3000;

app.get("/", (req,res)=>{
    res.send("HI My Name is AJMAL");
})

app.use("/api/category", catgoryRouter);

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`)
})