const { Op } = require("sequelize");
const sequelize = require("../../config/sequelize");
const { generateOtp } = require("../../helpers/generateOtp");
const { User, Otp } = require("../../models/associations");
const emailSender = require("../../helpers/sendEmail");
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
    if (!user.verified)
      return res.sendClientError(401, "Please verify your email first");
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
    const data = await Otp.findByPk(newOtp.id, {
      include: [{ model: User, attributes: ["id", "email", "username"] }],
      transaction: t,
    });
    const subject = `Resetting your password - ${data.code}`;
    const sendEmail = await emailSender(data, subject, "forgot-password.ejs");
    t.commit();
    return res.sendSuccess(200, sendEmail);
  } catch (error) {
    console.log(error);
    t.rollback();
    res.sendServerError();
  }
};

module.exports = forgotPassword;
