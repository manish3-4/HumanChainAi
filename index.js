// index.js

import express from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./db/connectToMongo.js";
import { createIncident, deleteIncidentById, getIncidentById, listIncidents } from "./controller/incidentsController.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json()); // Middleware to parse JSON



app.get("/", (req, res) => {
  res.send("Hello from Express with ES6!");
});
app.get("/incidents", listIncidents);
app.post("/incidents", createIncident);
app.get("/incidents/:id", getIncidentById);
app.delete("/incidents/:id", deleteIncidentById)

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
