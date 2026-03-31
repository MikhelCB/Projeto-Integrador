import Sequelize, { Model } from "sequelize";

class Servico extends Model {
  static init(sequelize) {
    super.init(
      {
        tp_servico: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "servico",
        timestamps: true,
      },
    );
  }

  static associate(models) {
    this.hasMany(models.Agendamento, {
      foreignKey: "servico_id",
    });
  }
}

export default Servico;
