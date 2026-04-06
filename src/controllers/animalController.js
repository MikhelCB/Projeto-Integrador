import Animal from "../models/Animal.js";
import Tutor from "../models/Tutor.js";

export const createAnimal = async (req, res) => {
  try {
    const { nome, especie, raca, tutor_id } = req.body;

    if (!nome || !especie || !raca || !tutor_id) {
      return res.status(400).json({
        message: "Nome, espécie, raça e tutor são obrigatórios",
      });
    }

    // valida se o tutor existe
    const tutor = await Tutor.findByPk(tutor_id);

    if (!tutor) {
      return res.status(404).json({ message: "Tutor não encontrado" });
    }

    const animal = await Animal.create({
      nome,
      especie,
      raca,
      tutor_id,
    });

    res.status(201).json(animal);
  } catch (err) {
    console.error("ERRO REAL:", err);
    res.status(500).json({
      message: err.message,
      detail: err.parent?.detail,
    });
  }
};
