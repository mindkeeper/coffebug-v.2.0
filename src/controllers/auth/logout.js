const Token = require("../../models/token");

const logout = async (req, res, next) => {
  const userId = req.payload.id;
  try {
    await Token.destroy({ where: { userId } });
    res.sendSuccess(200, { msg: "Logout Success" });
  } catch (error) {
    console.log(error);
    return res.sendServerError();
  }
};

module.exports = logout;
