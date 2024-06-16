import express from "express";
import { authJwt } from "../middlewares/index.js";
import { LinkController } from "../controllers/index.js";

const linkRouter = express.Router();

linkRouter.get("/me", [authJwt.verifyToken], LinkController.getLinksByLoggedInUser);
linkRouter.post("", [authJwt.verifyToken], LinkController.createLink);
linkRouter.put("/:linkId", [authJwt.verifyToken], LinkController.deleteLink);

export default linkRouter;