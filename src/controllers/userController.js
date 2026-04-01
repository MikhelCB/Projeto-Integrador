import Tutor from "../models/Tutor.js";
import crypto from "node:crypto";

export const createTutor = async (req, res) => {
  const createTutor = {
    nome: req.body.nome,
    cpf: req.body.cpf,
    telefone: req.body.telefone,
    endereco: req.body.endereco,
  };
  const tutor = await Tutor.create(createTutor);

  res.status(201).json(tutor);
};

export const getAllUsers = (req, res) => {
  res.status(200).json({ message: "Deu bom" });
};

export const deleteUser = (req, res) => {
  res.status(200).json({ message: "Deu bom" });
};
