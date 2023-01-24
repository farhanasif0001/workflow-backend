'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class priorities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // priorities.hasMany(models.tasks, {
      //   foreignKey: "priorityId"
      // })
    }
  }
  priorities.init({
    value: DataTypes.INTEGER,
    label: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'priorities',
  });
  return priorities;
};