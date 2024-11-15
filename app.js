require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(express.json());
app.use(require("cors")());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);

// Listen on PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
