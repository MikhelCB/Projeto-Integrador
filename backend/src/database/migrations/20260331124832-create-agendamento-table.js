"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("agendamento", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      animal_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "animal",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      tutor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tutor",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      servico_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "servico",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("agendamento");
  },
};
