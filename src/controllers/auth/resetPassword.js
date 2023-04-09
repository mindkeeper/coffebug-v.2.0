const sequelize = require("../../config/sequelize");

const resetPassword = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const getUser = await User.FindOne({ where: { email: req.body.email } });
    t.commit();
    res.sendSuccess(getUser);
  } catch (error) {
    console.log(error);
    t.rollback();
    res.sendServerError();
  }
};

module.exports = resetPassword;
