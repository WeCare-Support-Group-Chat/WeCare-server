const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { decode } = require("./jwt");

const hashPw = (password) => {
  return bcrypt.hashSync(password);
};

const compare = (password, hashPw) => {
  return bcrypt.compareSync(password, hashPw);
};

const authN = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const token = authorization.split(" ")[1];

    const verify = decode(token);

    const user = await User.findByPk(verify.id);

    req.loginInfo = {
      id: user.id,
      username: user.username,
    };
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  hashPw,
  compare,
  authN,
};
