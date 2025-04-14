import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"
import posts from "./routers/posts.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const URI = process.env.DB_URL;

app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

app.use("/posts", posts);

mongoose
	.connect(URI)
	.then(() => {
		console.log("Connected to DB");
		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.log("err", err);
	});
