import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

// Enabling CORS for frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

// API routes
app.use("/api/payments", paymentRoutes);
app.use("/api/books", bookRoutes);

const PORT = process.env.PORT || 3000;

// Connection to MongoDB
connectDB();

// Starting the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
