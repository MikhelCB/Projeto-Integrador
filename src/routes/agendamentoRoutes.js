import express from "express";
import {
  createAgendamento,
  getAllAgendamento,
  updateAgendamento,
} from "../controllers/agendamentoController.js";

const router = express.Router();

router.post("/", createAgendamento);
router.get("/", getAllAgendamento);
router.put("/:id", updateAgendamento);
// router.delete("/:id", deleteAnimal);

export default router;
