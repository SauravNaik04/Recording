import express from "express";
import dotenv from "dotenv";
import connectMongoDB from "./mongodb.js";
import morgan from "morgan";
import userRoutes from "./route/userRoute.js";
import cors from "cors";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

dotenv.config();

connectMongoDB();

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));

app.use("/api/v1/auth", userRoutes);

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
