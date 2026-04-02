import express from "express";
import {
  createTutor,
  getAllTutor,
  deleteUser,
} from "./controllers/tutorController.js";

const router = express.Router();

router.post("/cadastro", createTutor);

router.get("/todos", getAllTutor);

router.delete("/deletar", deleteUser);

export default router;
