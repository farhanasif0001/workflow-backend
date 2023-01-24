'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.belongsTo(models.roles, {
        foreignKey: "roleId",
        as: "role"
      })
      users.hasMany(models.projects, {
        foreignKey: "developerId"
      })
      users.hasMany(models.projects, {
        foreignKey: "managerId"
      })
      users.hasMany(models.projects, {
        foreignKey: "callerId"
      })
      users.hasMany(models.tasks, {
        foreignKey: "assignedtoId"
      })
      users.hasMany(models.tasks, {
        foreignKey: "assignedbyId"
      })
    }
  }
  users.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.INTEGER
  }, {
    scopes: {
      withoutPassword: {
        attributes: { exclude: ['password'] },
      }
    },
    sequelize,
    modelName: 'users',
  });
  return users;
};