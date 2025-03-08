import express from "express";
import multer from "multer";
import { createBirthday, getAllBirthdays, getSingleBirthday } from "../controllers/birthdayController.js";

const router = express.Router();

// Set up Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/birthday -> create a new birthday
router.post("/", upload.single("image"), createBirthday);

// GET /api/birthday -> list all birthdays
router.get("/", getAllBirthdays);

router.get("/:id", getSingleBirthday);

export default router;
