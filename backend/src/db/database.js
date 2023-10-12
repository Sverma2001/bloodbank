const mongoose = require("mongoose");

// const url = 'mongodb+srv://sverma:Sachin2001@blood-bank.jgkeavx.mongodb.net/donors?retryWrites=true&w=majority';

const url = "mongodb://localhost:27017/blood-bank";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout for server selection,
    // ssl: true, // Enable SSL
  })

  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });