import express from "express";
import * as controllers from "../controllers/query";

const queries = express();

queries.use(express.json());

queries.post("/", controllers.postIssue);
queries.post("/getprompts", controllers.getPrompts);
queries.post("/nearbyHospital", controllers.getNearbyHospital);
queries.post("/emergency", controllers.emergency);
// queries.post("/outbreak", controllers.outbreak);
queries.post("/getLocations", controllers.getLocations);
export default queries;
