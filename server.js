import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Expertoconnect Backend is LIVE on Render!");
});

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is LIVE!" });
});

// Render requires this port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
