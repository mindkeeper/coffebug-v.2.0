const { Op } = require("sequelize");
const sequelize = require("../../config/sequelize");
const { generateOtp } = require("../../helpers/generateOtp");
const { User, Otp } = require("../../models/associations");
const forgotPassword = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const emailOrUsername = req.body.emailOrUsername;
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: emailOrUsername }, { email: emailOrUsername }],
      },
      transaction: t,
    });

    if (!user)
      return res.sendClientError(400, "email/username isn't registered");
    const activeOtps = await user.getOtps({
      where: { status: "Active" },
      transaction: t,
    });
    if (activeOtps.length > 0) {
      await Otp.update(
        { status: "Expired" },
        { where: { status: "Active", userId: user.id }, transaction: t }
      );
    }

    const newOtp = await Otp.create(
      { code: generateOtp().toString(), userId: user.id },
      { transaction: t }
    );
    t.commit();
    return res.sendSuccess(200, { newOtp });
  } catch (error) {
    console.log(error);
    t.rollback();
    res.sendServerError();
  }
};

module.exports = forgotPassword;
