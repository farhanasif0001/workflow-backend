'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hiringnames extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      hiringnames.hasMany(models.projects, {
        foreignKey: "hiredId"
      })
    }
  }
  hiringnames.init({
    value: DataTypes.INTEGER,
    label: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'hiringnames',
  });
  return hiringnames;
};