import Animal from "../models/Animal.js";
import Tutor from "../models/Tutor.js";

export const createAnimal = async (req, res) => {
  try {
    const { nome, especie, raca, tutor_id } = req.body;

    if ((!nome || !especie, raca, tutor_id)) {
      return res
        .status(400)
        .json({ message: "Nome, especie, raça e tutor são obrigatórios" });
    }

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
    res.status(500).json({ message: "Erro ao criar animal" });
  }
};
