'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      typeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "tasktypes", key: "id" },
      },
      priorityId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "priorities", key: "id" },
      },
      startdate: {
        type: Sequelize.DATE
      },
      enddate: {
        type: Sequelize.DATE
      },
      assignedtoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "users", key: "id" },
      },
      assignedbyId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "users", key: "id" },
      },
      projectId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "projects", key: "id" },
      },
      statusId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "taskstatuses", key: "id" },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
  }
};