import express from "express";
import * as controllers from "../controllers/mother";

const mother = express();

mother.use(express.json());

mother.post("/addMother", controllers.addMother);
mother.get("/getMother", controllers.getMother);

export default mother;
