import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cloudinaryConfig from "./config/cloudinary.js";

// Import routes
import birthdayRoutes from "./routes/birthdayRoutes.js";
import wishRoutes from "./routes/wishRoutes.js";
import shareRoutes from "./routes/shareRoutes.js";

dotenv.config();

// Initialize Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Cloudinary + DB Setup
cloudinaryConfig();
connectDB();

// Mount the routes
app.use("/api/birthday", birthdayRoutes);
app.use("/api/wish", wishRoutes);
app.use("/api/share", shareRoutes);

// Start the server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
