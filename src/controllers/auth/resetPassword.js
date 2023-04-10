const sequelize = require("../../config/sequelize");
const Otp = require("../../models/otp");
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const resetPassword = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { newPassword, confirmPassword, otp } = req.body;
    if (newPassword !== confirmPassword)
      return res.sendClientError(400, "confirm password isnt matched");
    const isValid = await Otp.findOne({
      where: { code: otp, status: "Active" },
    });
    if (!isValid)
      return res.sendClientError(400, "OTP is expired or is not valid anymore");
    const user = await User.findByPk(isValid.userId);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Otp.update(
      { status: "Used" },
      { where: { code: otp }, transaction: t }
    );
    await user.update({ password: hashedPassword }, { transaction: t });
    await t.commit();
    return res.sendSuccess(200, "password changed, please login");
  } catch (error) {
    console.log(error);
    t.rollback();
    return res.sendServerError();
  }
};

module.exports = resetPassword;
