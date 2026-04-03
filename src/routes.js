import express from "express";
import {
  createTutor,
  getAllTutor,
  deleteTutor,
  updateTutor,
} from "./controllers/tutorController.js";

const router = express.Router();

router.post("/cadastro", createTutor);

router.get("/todos", getAllTutor);

router.put("/atualizar/:id", updateTutor);

router.delete("/deletar/:id", deleteTutor);

export default router;
