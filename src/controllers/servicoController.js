import Servico from "../models/Servico.js";

export const createServico = async (req, res) => {
  try {
    const { tp_servico } = req.body;
    if (!tp_servico) {
      return res
        .status(404)
        .json({ message: "Tipo de serviço é obrigatŕorio" });
    }

    const servico = await Servico.create({
      tp_servico,
    });

    res.status(200).json(servico);
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar servico" });
  }
};

export const getAllServicos = async (req, res) => {
  try {
    const getservico = await Servico.findAll();
    res.status(200).json(getservico);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar serviços" });
  }
};

export const updateServico = async (req, res) => {
  try {
    const updateservico = await Servico.update(req.body, {
      where: { id: req.params.id },
    });

    res.status(200).json({ message: "Servico atualizado" });

    if (!updateservico[0]) {
      return res.status(404).json({ message: "Serviço não encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar serviço" });
  }
};
