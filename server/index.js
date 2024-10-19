// Import necessary modules
import express from "express"; // Express framework for building the server
import dotenv from "dotenv"; // dotenv module to load environment variables from a .env file
import cookieParser from "cookie-parser"; // Middleware to parse cookies
import cors from "cors"; // Middleware to handle Cross-Origin Resource Sharing (CORS)
import { userRoute } from "./routes/userRoute.js";
import { residencyRoute } from "./routes/residencyRoute.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies

// CORS configuration
app.use(cors({
  origin: "https://sand-and-sea-iota.vercel.app/", // Frontend URL without trailing slash
  credentials: true
}));

app.get("/", (req, res) => {
  console.log("Backend Working!");
  res.send("Hello World!");
});

// API routes
app.use("/api/user", userRoute);
app.use("/api/residency", residencyRoute);

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
