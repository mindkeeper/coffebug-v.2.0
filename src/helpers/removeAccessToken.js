const { Op } = require("sequelize");
const Token = require("../models/token");

const removeAccessToken = async () => {
  try {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 1000 * 60 * 60);
    const tokens = await Token.destroy({
      where: {
        createdAt: { [Op.lt]: oneHourAgo },
      },
    });
    
    console.log("runned");
  } catch (error) {
    console.log(error);
  }
};

module.exports = removeAccessToken;
