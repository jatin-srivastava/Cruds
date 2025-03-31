
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const route = require("./routes/userRoutes.js"); // Assuming userRoutes.js exists
const cors = require("cors");

const app = express();
dotenv.config();

// Middleware setup
app.use(express.json());  // Parse JSON data from requests
app.use(cors({
  origin: ['https://cruds-1.onrender.com'], // Allow only specific origin (you can modify this)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow credentials if you're using cookies or sessions
}));

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGOURL;

const startServer = async () => {
  try {
    // MongoDB connection
    await mongoose.connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB connected successfully");

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);  // Exit process if MongoDB connection fails
  }
};

// Call the function to start the server
startServer();

// Use routes for your API
app.use("/api", route);
