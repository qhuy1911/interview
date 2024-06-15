import express from "express";
// import {authController} from "../controllers/index.js";
import authRouter from "./authRouter.js";

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World!')
});

router.use('/auth', authRouter)

export default router