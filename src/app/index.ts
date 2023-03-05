import express from "express";
import query from "./routes/query";
import mother from "./routes/mother";
import admin from "./routes/admin";
const app = express();

app.use(express.json());

app.use("/query", query);
app.use("/mother", mother);
app.use("/admin", admin);

export default app;
