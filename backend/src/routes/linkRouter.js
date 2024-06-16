import express from "express";
import { authJwt } from "../middlewares/index.js";
import { LinkController } from "../controllers/index.js";

const linkRouter = express.Router();

linkRouter.get("", [authJwt.verifyToken], LinkController.getAllLinks)
linkRouter.get("/me", [authJwt.verifyToken], LinkController.getLinksByLoggedInUser);

export default linkRouter;