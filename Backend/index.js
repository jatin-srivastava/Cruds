const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const route = require("./routes/userRoutes.js"); // Assuming userRoutes.js exists

const app = express();
dotenv.config();

app.use(bodyParser.json());  // Parse JSON data from requests
app.use(cors());  // Enable Cross-Origin Resource Sharing (CORS)

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGOURL;

const startServer = async () => {
  try {
    // MongoDB connection
    await mongoose.connect(MONGOURL);
    console.log("MongoDB connected successfully");

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

// Call the function to start the server
startServer();

// Use routes for your API
app.use("/api", route);


// const express = require("express")
// const mongoose = require("mongoose")
// const dotenv = require("dotenv")
// const bodyParser = require("body-parser")
// const route = require("./routes/userRoutes.js")
// const cors = require("cors")
// const app = express()
// dotenv.config()
// app.use(bodyParser.json())
// app.use(cors());

// const PORT = process.env.PORT || 5000
// const MONGOURL = process.env.MONGOURL


// mongoose.connect(MONGOURL)
// .then(()=>{
//     console.log("MongoDB connected succesfully");

//         app.listen(PORT,()=>{
//     console.log("server is running succesfull");
// })
// })
// .catch((err)=>{
// console.log(err);
// })

// app.use("/api",route)