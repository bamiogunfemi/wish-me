// routes/shareRoutes.js
import express from "express";
import { shareBirthday } from "../controllers/shareController.js";

const router = express.Router();

router.post("/", shareBirthday);

export default router;
