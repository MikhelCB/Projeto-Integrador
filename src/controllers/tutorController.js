import Tutor from "../models/Tutor.js";

//Criando um tutor
export const createTutor = async (req, res) => {
  try {
    const { nome, cpf, telefone, endereco } = req.body;

    if (!nome || !cpf) {
      return res.status(400).json({ message: "Nome e CPF obrigatórios" });
    }

    const tutor = await Tutor.create({
      nome,
      cpf,
      telefone,
      endereco,
    });

    res.status(201).json(tutor);
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar tutor" });
  }
};

export const updateTutor = async (req, res) => {
  try {
    const updated = await Tutor.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updated[0]) {
      return res.status(404).json({ message: "Tutor Não encontrado" });
    }

    res.status(200).json({ message: "Tutor atualizado" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar tutor" });
  }
};

export const getAllTutor = async (req, res) => {
  try {
    const getTutor = await Tutor.findAll();
    res.status(200).json(getTutor);
  } catch (err) {
    res.status(500).json({ message: "Nenhum tutor encontrado" });
  }
};

export const deleteTutor = async (req, res) => {
  try {
    const deltutor = await Tutor.destroy({
      where: { id: req.params.id },
    });
    if (!deltutor) {
      return res.status(404).json({ message: "Tutor não encontrado" });
    }

    res.status(200).json({ message: "Tutor deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao deletar tutor" });
  }
};
