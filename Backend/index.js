const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const route = require("./routes/userRoutes.js")
const cors = require("cors")
const app = express()
dotenv.config()
app.use(bodyParser.json())
app.use(cors());

const PORT = process.env.PORT || 5000
const MONGOURL = process.env.MONGOURL


mongoose.connect(MONGOURL)
.then(()=>{
    console.log("MongoDB connected succesfully");

        app.listen(PORT,()=>{
    console.log("server is running succesfull");
})
})
.catch((err)=>{
console.log(err);
})

app.use("/api",route)