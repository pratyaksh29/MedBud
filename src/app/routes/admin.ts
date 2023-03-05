import express from "express";
import * as controllers from "../controllers/admin";

const admin = express();

admin.use(express.json());

admin.post("/users", controllers.getUsers);
admin.get("/user", controllers.getUser);

export default admin;
