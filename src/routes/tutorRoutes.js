import express from "express";
import {
  createTutor,
  getAllTutor,
  deleteTutor,
  updateTutor,
} from "../controllers/tutorController.js";

const router = express.Router();

router.post("/", createTutor);

router.get("/", getAllTutor);

router.put("/:id", updateTutor);

router.delete("/:id", deleteTutor);

export default router;
