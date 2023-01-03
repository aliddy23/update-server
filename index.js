import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/ver/:app/:mv", async (req, res) => {
	const data = JSON.parse(fs.readFileSync(`/mnt/builds/${req.params.app}/data.json`, "utf-8"));
	if (req.params.mv.includes("v") && data[req.params.mv]) res.send(data[req.params.mv].latest);
	else res.sendStatus(500);
});

app.get("/cl/:app/:ver", async (req, res) => {
	res.sendFile(`/mnt/builds/${req.params.app}/changelog/${req.params.ver}.md`);
});

app.get("/dl/:app/:v.zip", async (req, res) => {
	res.download(`/mnt/builds/${req.params.app}/update/${req.params.v}.zip`);
});

app.listen(3000);
