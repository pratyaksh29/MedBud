import express from "express";
import query from "./routes/query";
import mother from "./routes/mother";
const app = express();

app.use(express.json());

app.use("/query", query);
app.use("/mother", mother);

export default app;
