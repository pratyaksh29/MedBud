import express from "express";
import * as controllers from "../controllers/query";

const queries = express();

queries.use(express.json());

queries.post("/", controllers.postIssue);
queries.post("/getprompts", controllers.getPrompts);

export default queries;
