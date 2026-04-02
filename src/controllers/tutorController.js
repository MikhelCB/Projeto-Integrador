import Tutor from "../models/Tutor.js";

//Criando um tutor
export const createTutor = async (req, res) => {
  try {
    const createTutor = {
      nome: req.body.nome,
      cpf: req.body.cpf,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
    };
    const tutor = await Tutor.create(createTutor);

    res.status(201).json(tutor);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAllTutor = async (req, res) => {
  const getTutor = await Tutor.findAll();

  res.status(200).json({ getTutor });
};

export const deleteUser = (req, res) => {
  res.status(200).json({ message: "Deu bom" });
};
