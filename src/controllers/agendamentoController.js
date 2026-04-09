import Animal from "../models/Animal.js";
import Tutor from "../models/Tutor.js";
import Servico from "../models/Servico.js";
import Agendamento from "../models/Agendamento.js";

export const createAgendamento = async (req, res) => {
  try {
    const { data, animal_id, tutor_id, servico_id } = req.body;

    if (!data || !animal_id || !tutor_id || !servico_id) {
      return res
        .status(400)
        .json({ message: "Data, animal, tutor e serviço são obrigatórios" });
    }

    const dataFormatada = new Date(data);

    // Verifica se a data está formatada corretamente
    if (isNaN(dataFormatada)) {
      return res.status(400).json({ message: "Data inválida" });
    }

    const animal = await Animal.findByPk(animal_id);
    const tutor = await Tutor.findByPk(tutor_id);
    const servico = await Servico.findByPk(servico_id);

    if (!animal) {
      return res.status(404).json({ message: "Animal não encontrado" });
    }

    if (!tutor) {
      return res.status(404).json({ message: "Tutor não encontrado" });
    }

    if (!servico) {
      return res.status(404).json({ message: "Serviço não encontrado" });
    }

    //Verifica se no registro do animal no banco de dados, o tutor_id vai ser o mesmo que o que vem desse body, ex: animal = {id: 1, nome: paçoca, tutor_id: 1}, o request de agendamento vem {"animal_id": 1, "tutor_id": 2}, no caso esse if iria retornar erro, pois os ids sao compativeis
    if (animal.tutor_id !== tutor_id) {
      return res
        .status(400)
        .json({ message: "Esse animal não pertence a esse tutor" });
    }

    // O método findone, retorna um dado específico, no caso a data que tem no body
    const conflito = await Agendamento.findOne({
      where: { data: dataFormatada },
    });

    if (conflito) {
      return res
        .status(400)
        .json({ message: "Já existe um agendamento nesse horário" });
    }

    const agendamento = await Agendamento.create({
      data,
      animal_id,
      tutor_id,
      servico_id,
    });
    res.status(201).json(agendamento);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Não foi possível realizar o agendamento" });
  }
};

export const getAllAgendamento = async (req, res) => {
  try {
    const getagendamento = await Agendamento.findAll();
    res.status(200).json(getagendamento);
  } catch (err) {
    res.status(500).json({ message: "Não foi possível buscar agendamentos" });
  }
};
