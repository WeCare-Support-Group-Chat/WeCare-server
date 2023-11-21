"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.UserGroup);
    }
  }
  Group.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Title is required" },
          notEmpty: { msg: "Title is required" },
        },
      },
      information: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Information is required" },
          notEmpty: { msg: "Information is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Group",
    }
  );
  return Group;
};
