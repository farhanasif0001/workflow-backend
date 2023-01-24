'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      projects.belongsTo(models.users, {
        as: "developer",
        foreignKey: "developerId"
      })
      projects.belongsTo(models.users, {
        as: "manager",
        foreignKey: "managerId"
      })
      projects.belongsTo(models.users, {
        as: "caller",
        foreignKey: "callerId"
      })
      projects.belongsTo(models.hiringnames, {
        as: "hired",
        foreignKey: "hiredId"
      })
      projects.belongsTo(models.projectstatuses, {
        as: "status",
        foreignKey: "projectstatusId"
      })
      // projects.hasMany(models.tasks, {
      //   foreignKey: "projectId"
      // })
    }
  }
  projects.init({
    name: DataTypes.STRING,
    hiredId: DataTypes.INTEGER,
    developerId: DataTypes.INTEGER,
    managerId: DataTypes.INTEGER,
    callerId: DataTypes.INTEGER,
    projectstatusId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'projects',
  });
  return projects;
};