import Sequelize, { Model } from "sequelize";

class Animal extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        especie: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        raca: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        tutor_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "animal",
        timestamps: true,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Tutor, {
      foreignKey: "tutor_id",
    });

    this.hasMany(models.Agendamento, {
      foreignKey: "animal_id",
    });
  }
}

export default Animal;
