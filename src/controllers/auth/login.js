const User = require("../../models/user");
const sequelize = require("../../config/sequelize");
const checkEmail = require("../../helpers/checkEmail");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Token = require("../../models/token");

const login = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { emailOrUsername, password } = req.body;
    let user;
    if (checkEmail(emailOrUsername)) {
      user = await User.findOne({
        where: { email: emailOrUsername },
        transaction: t,
      });
    } else {
      user = await User.findOne({
        where: { username: emailOrUsername },
        transaction: t,
      });
    }
    if (!user) return res.sendClientError(401, "Email/Password is Wrong");

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      return res.sendClientError(401, "Email/Password is Wrong");
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.roleId,
    };
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secretKey, {
      expiresIn: "10h",
      issuer: "Coffebug",
    });
    const saveToken = await Token.create({ userId: user.id, token });
    await t.commit();
    res.sendSuccess(200, { ...payload, token });
  } catch (error) {
    console.log(error);
    t.rollback();
    res.sendServerError(error);
  }
};

module.exports = login;
