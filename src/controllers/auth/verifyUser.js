const User = require("../../models/user");

const verifyUser = async (req, res, next) => {
  try {
    const registerToken = req.params.token;
    const user = await User.findOne({
      where: { registerToken, verified: false },
    });
    if (!user) return res.sendClientError(400, "User Not Found");
    await user.update({ verified: true, registerToken: null });
    res.status(200).render("register-verified");
  } catch (error) {
    console.log(error);
    res.sendServerError();
  }
};

module.exports = verifyUser;
