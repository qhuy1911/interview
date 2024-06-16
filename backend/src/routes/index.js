import express from "express";
import authRouter from "./authRouter.js";
import linkRouter from "./linkRouter.js";

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World!')
});

router.use('/auth', authRouter)
router.use('/links', linkRouter)

export default router;
