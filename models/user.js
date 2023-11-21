"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
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
  User.init(
    {
      username: DataTypes.STRING,
      secret: DataTypes.STRING,
      firstTime: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((el) => {
    el.secret = bcrypt.hashSync(el.secret);
    el.firstTime = false;
  });
  return User;
};
