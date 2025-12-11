const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

const catgoryRouter = require("./routers/category-router");
const productRouter = require("./routers/product-router");
const emailRouter  = require("./routers/email-router");
const authRouter = require('./routers/auth.router');
const addressRouter = require("./routers/address.router");

const {connectDB} = require("./config/db");


dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));

app.get("/", (req,res)=>{
    res.send("HI My Name is AJMAL");
})

app.use("/api/v1/category", catgoryRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/email", emailRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/address", addressRouter);

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`)
})