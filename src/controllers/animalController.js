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

export const getAllAnimal = async (req, res) => {
  try {
    const getAnimal = await Animal.findAll();
    res.status(200).json(getAnimal);
  } catch (err) {
    res.status(500).json({ message: "Nenhum animal encontrado" });
  }
};

export const updateAnimal = async (req, res) => {
  try {
    const update = await Animal.update(req.body, {
      where: { id: req.params.id },
    });

    res.status(200).json({ message: "Animal atualizado" });

    if (!update[0]) {
      return res.status(404).json({ message: "Animal não encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar animal" });
  }
};

export const deleteAnimal = async (req, res) => {
  try {
    const delanimal = await Animal.destroy({
      where: { id: req.params.id },
    });
    if (!delanimal) {
      res.status(404).json({ message: "Animal não encontrado" });
    }
    res.status(200).json({ message: "Animal deletado" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao deletar animal" });
  }
};
