import express from "express";
import {
  createTutor,
  getAllUsers,
  deleteUser,
} from "./controllers/userController.js";

const router = express.Router();

router.post("/cadastro", createTutor);

router.get("/todos", getAllUsers);

router.delete("/deletar", deleteUser);

export default router;
