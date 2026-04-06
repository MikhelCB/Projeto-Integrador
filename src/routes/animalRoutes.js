import express from "express";
import {
  createAnimal,
  getAllAnimal,
  updateAnimal,
  //   deleteAnimal,
} from "../controllers/animalController.js";

const router = express.Router();

router.post("/", createAnimal);
router.get("/", getAllAnimal);
router.put("/:id", updateAnimal);
// router.get("/:id", deleteAnimal);

export default router;
