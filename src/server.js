import express from "express";
import Tutor from "./models/Tutor.js";
import Animal from "./models/Animal.js";
import Servico from "./models/Servico.js";
import Agendamento from "./models/Agendamento.js";

import { Sequelize } from "sequelize";
import config from "./config/database.js";
import tutorRoutes from "./routes/tutorRoutes.js";
import animalRoutes from "./routes/animalRoutes.js";

const app = express();
app.use(express.json());

const sequelize = new Sequelize(config);
//Fazendo o init de todos os models
Tutor.init(sequelize);
Animal.init(sequelize);
Servico.init(sequelize);
Agendamento.init(sequelize);

//Fazendo os relacionamentos
Tutor.associate({ Animal, Agendamento });
Animal.associate({ Tutor, Agendamento });
Servico.associate({ Agendamento });
Agendamento.associate({ Tutor, Animal, Servico });

app.use("/tutores", tutorRoutes);
app.use("/animais", animalRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Banco de dados conectado");
    app.listen(3000, () => console.log("Servidor ON"));
  })
  .catch((err) => {
    console.error(err);
  });
