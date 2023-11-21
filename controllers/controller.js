const { comparePassword } = require("../helpers/bcrypt");
const { User, Group, UserGroup } = require("../models");
const axios = require("axios");
const CHAT_ENGINE_PRIVATE_KEY = process.env.CHAT_ENGINE_PRIVATE_KEY;
const { signToken } = require("../helpers/jwt");

class Controller {
  static async registerToPostgresAndCE(req, res, next) {
    try {
      const { username: u, password: p } = req.body; //dapat dari UI kita

      //register ke CE
      const data = await axios.post(
        `https://api.chatengine.io/users/`,
        { username: u, secret: p },
        { headers: { "private-key": CHAT_ENGINE_PRIVATE_KEY } }
      );
      // res.status(data.status).json(data.data);

      //register ke Postgres
      const newUser = {
        username: u,
        secret: p,
        firstTime: "true",
      };
      const response = await User.create(newUser);

      res
        .status(201)
        .json({ msg: `User id ${response.id} successfully created!` });
    } catch (error) {
      next(error);
    }
  }

  static async loginToPostgres(req, res, next) {
    try {
      const { username: u, password: p } = req.body; //dapat dari UI kita

      if (!u || !p) {
        throw new Error("Username/password is not given");
      }

      const user = await User.findOne({
        where: { username: u },
      });

      if (!user) {
        throw new Error("Data not found");
      }

      if (!comparePassword(p, user.secret)) {
        throw new Error("Invalid email/password");
      }

      const payload = {
        id: user.id,
        username: user.username,
      };
      const token = signToken(payload);

      //firstTime or not?
      const firstTimeOrNot = await User.findOne({
        where: { username: user.username },
      });

      res.status(200).json({
        access_token: token,
        username: user.username,
        firstTime: firstTimeOrNot.firstTime,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateFirstTimeColumnPostgres(req, res, next) {
    try {
      const { id, username } = req.loginInfo;
      await User.update(
        { firstTime: "false" },
        {
          where: { id },
        }
      );
      res.status(200).json({
        msg: `User id ${response.id} firstTime column successfully updated!`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async loginToCE(req, res, next) {
    try {
      const { id, username } = req.loginInfo;

      res.status(200).json({
        projectID: CHAT_ENGINE_PRIVATE_KEY,
        userName: username,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
