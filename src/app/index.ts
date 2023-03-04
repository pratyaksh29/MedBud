import express from "express";
import query from "./routes/query";

const app = express();

app.use(express.json());

app.use("/query", query);

export default app;
