require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const errorHandler = require("./utils/errorHandler");
const helmet = require("helmet");
const swaggerDocs = require("./swagger");

// Middleware
app.use(express.json());
app.use(require("cors")());
app.use(helmet());

// Connect to MongoDB
connectDB();

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the Election Management API");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/candidates", candidateRoutes);

// Swagger Docs
swaggerDocs(app);

// Error Handler
app.use(errorHandler);

// Listen on PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
