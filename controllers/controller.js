const { default: axios } = require("axios");
const { compare } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User, Group, UserGroup } = require("../models");
class Controller {
  static async register(req, res, next) {
    try {
      const { username, secret } = req.body;
      // console.log(username, secret);
      await User.create({
        username,
        secret,
      });

      const r = await axios.put(
        "https://api.chatengine.io/users/",
        { username: username, secret: username, first_name: username },
        { headers: { "private-key": "b3d31801-81a9-4188-a349-704463c2cae7" } }
      );

      res.status(201).json({
        message: "succeed create user",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, secret } = req.body;

      const user = await User.findOne({
        where: {
          username,
        },
      });
      console.log(user);

      if (!user || !compare(secret, user.secret)) throw { name: "Forbidden" };

      const payload = {
        id: user.id,
        username: user.username,
      };

      const access_token = signToken(payload);

      res.status(200).json({
        access_token: access_token,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async addGroupToUser(req, res, next) {
    try {
      const group = ["214844", "214845", "214846", "214847", "214848"];

      // const data = group.map((el) => {
      //   console.log(el);
      //   return el;
      // });

      // group.forEach(el => {
      //   const r2 = await axios.post(
      //     `https://api.chatengine.io/chats/${el}/people/`,
      //     { username: "akbar" },
      //     {
      //       headers: {
      //         "Project-ID": "ce7d3869-0c1b-4129-9299-5428dc2cd481",
      //         "User-Name": "cecep",
      //         "User-Secret": "cecep",
      //       },
      //     }
      //   );
      // })
      // let r2;
      for (const el of group) {
        const r2 = await axios.post(
          `https://api.chatengine.io/chats/${el}/people/`,
          { username: req.loginInfo.username },
          {
            headers: {
              "Project-ID": "ce7d3869-0c1b-4129-9299-5428dc2cd481",
              "User-Name": "cecep",
              "User-Secret": "cecep",
            },
          }
        );
        res.status(r2.status).json(r2.data);
      }

      // console.log(r2);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static async showGroupOfUser(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  static async deleteGroupOfUser(req, res, next) {
    try {
      const { id } = req.params;

      const r = await axios.put(
        `https://api.chatengine.io/chats/${id}/people/`,
        { username: req.loginInfo.username },
        {
          headers: {
            "Project-ID": "ce7d3869-0c1b-4129-9299-5428dc2cd481",
            "User-Name": "cecep",
            "User-Secret": "cecep",
          },
        }
      );
      res.status(r.status).json(r.data);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
}

module.exports = Controller;
