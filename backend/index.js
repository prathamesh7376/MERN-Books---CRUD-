import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoutes from "./routes/booksRoutes.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data

// Basic route
app.get("/", (req, res) => {
  return res.status(200).send(`Welcome To MERN Stack Tutorial`);
});

// Book routes
app.use("/books", bookRoutes);

// Connect to MongoDB and start the server
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database connection error: ", error);
  });
