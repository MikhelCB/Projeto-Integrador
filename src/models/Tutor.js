import Sequelize, { Model } from "sequelize";

class Tutor extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        cpf: {
          type: Sequelize.STRING(11),
          unique: true,
          allowNull: false,
        },
        telefone: Sequelize.STRING,
        endereco: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: "tutor",
        timestamps: true,
      },
    );
  }

  static associate(models) {
    this.hasMany(models.Animal, {
      foreignKey: "tutor_id",
    });

    this.hasMany(models.Agendamento, {
      foreignKey: "tutor_id",
    });
  }
}

export default Tutor;
