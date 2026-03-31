import Sequelize, { Model } from "sequelize";

class Agendamento extends Model {
  static init(sequelize) {
    super.init(
      {
        data: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        animal_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        tutor_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        servico_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "agendamento",
        timestamps: true,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Animal, {
      foreignKey: "animal_id",
    });

    this.belongsTo(models.Tutor, {
      foreignKey: "tutor_id",
    });

    this.belongsTo(models.Servico, {
      foreignKey: "servico_id",
    });
  }
}

export default Agendamento;
