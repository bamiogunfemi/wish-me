import express from "express";
import { createWish, getWishesByBirthday } from "../controllers/wishController.js";

const router = express.Router();

// POST /api/wish -> create a new wish
router.post("/", createWish);

// GET /api/wish/:birthdayId -> get all wishes for a particular birthday
router.get("/:birthdayId", getWishesByBirthday);

export default router;
