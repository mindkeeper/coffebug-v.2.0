const Token = require("../../models/token");
const jwt = require("jsonwebtoken");
const isLogin = async (req, res, next) => {
  try {
    const token = req.headers.authorization
      .split(" ")
      .filter((value) => value !== "Bearer");
    if (!req.headers.authorization || !token)
      return res.sendClientError(403, "You have to Login First");
    const checkToken = await Token.findOne({ where: { token } });
    if (!checkToken) return res.sendClientError(403, "You have to Login First");
    const { SECRET_KEY } = process.env;
    const payload = jwt.verify(token, SECRET_KEY, { issuer: "Coffebug" });
    req.payload = payload;
    next();
  } catch (error) {
    console.log(error);
    return res.sendServerError(error);
  }
};

module.exports = isLogin;
