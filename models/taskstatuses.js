'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class taskstatuses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // taskstatuses.hasMany(models.tasks, {
      //   foreignKey: "statusId"
      // })
    }
  }
  taskstatuses.init({
    value: DataTypes.INTEGER,
    label: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'taskstatuses',
  });
  return taskstatuses;
};