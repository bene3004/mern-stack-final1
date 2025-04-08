import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";

import noteRoutes from "./routes/note.route.js";
import userRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).send("OK");
});

app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("server started at http://localhost:" + PORT);
});
