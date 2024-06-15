import express from "express";
import { AuthController } from "../controllers/index.js";
import { verifySignUp } from "../middlewares/index.js";

const authRouter = express.Router();

authRouter.post("/signup", [verifySignUp.checkDuplicateEmail], AuthController.signup);
authRouter.post("/signin", AuthController.signin);

export default authRouter;