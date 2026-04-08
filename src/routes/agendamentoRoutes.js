import express from "express";
import { createAgendamento } from "../controllers/agendamentoController.js";

const router = express.Router();

router.post("/", createAgendamento);
// router.get("/", getAllAnimal);
// router.put("/:id", updateAnimal);
// router.delete("/:id", deleteAnimal);

export default router;
