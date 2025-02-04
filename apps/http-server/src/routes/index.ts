import express from "express";
import auth from "./auth";
import user from "./user";
import message from "./message";

const router = express.Router();

router.use('/auth', auth);
router.use('/user', user);
router.use('/message', message);

export default router;