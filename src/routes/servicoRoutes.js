import express from "express";
import {
  createServico,
  getAllServicos,
} from "../controllers/servicoController.js";

const router = express.Router();

router.post("/", createServico);
router.get("/", getAllServicos);
// router.put("/:id", updateServico);
// router.delete("/:id", deleteServico);

export default router;
