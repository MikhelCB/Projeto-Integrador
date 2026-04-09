import express from "express";
import {
  createAgendamento,
  getAllAgendamento,
} from "../controllers/agendamentoController.js";

const router = express.Router();

router.post("/", createAgendamento);
router.get("/", getAllAgendamento);
// router.put("/:id", updateAnimal);
// router.delete("/:id", deleteAnimal);

export default router;
