'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      tasks.belongsTo(models.tasktypes, {
        as: "type",
        foreignKey: "typeId"
      })
      tasks.belongsTo(models.priorities, {
        as: "priority",
        foreignKey: "priorityId"
      })
      tasks.belongsTo(models.users, {
        as: "assignedto",
        foreignKey: "assignedtoId"
      })
      tasks.belongsTo(models.users, {
        as: "assignedby",
        foreignKey: "assignedbyId"
      })
      tasks.belongsTo(models.projects, {
        as: "project",
        foreignKey: "projectId"
      })
      tasks.belongsTo(models.taskstatuses, {
        as: "status",
        foreignKey: "statusId"
      })
    }
  }
  tasks.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    typeId: DataTypes.INTEGER,
    priorityId: DataTypes.INTEGER,
    startdate: DataTypes.DATE,
    enddate: DataTypes.DATE,
    assignedtoId: DataTypes.INTEGER,
    assignedbyId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tasks',
  });
  return tasks;
};
