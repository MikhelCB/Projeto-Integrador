import express from "express";
import {
  createTutor,
  getAllTutor,
  deleteTutor,
} from "./controllers/tutorController.js";

const router = express.Router();

router.post("/cadastro", createTutor);

router.get("/todos", getAllTutor);

router.delete("/deletar/:id", deleteTutor);

export default router;
