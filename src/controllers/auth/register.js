const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const sendResponse = require("../../helpers/sendResponse");

const User = require("../../models/user");
const Role = require("../../models/role");
const Profile = require("../../models/profile");
const sequelize = require("../../config/sequelize");
const register = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { email, phone, password, username, firstName, lastName } = req.body;
    const existingUser = await User.findAll({
      where: {
        [Op.or]: [{ email: email }, { phone: phone }, { username: username }],
      },
      transaction: t,
    });
    if (existingUser.length > 0) {
      if (existingUser.length > 1)
        return res.sendClientError(
          400,
          "Email or Phone or username Already Exist"
        );
      let message = "";
      if (existingUser[0].email === email) message = "Email already exists";
      if (existingUser[0].phone === phone) message = "Phone already exists";
      if (existingUser[0].username === username)
        message = "Username already exists";
      return res.sendClientError(400, message);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = await Role.findOne({
      where: { name: "User" },
      transaction: t,
    });
    const newUser = await User.create(
      {
        username,
        email,
        phone,
        password: hashedPassword,
        roleId: role.id,
        profile: {
          firstName,
          lastName,
        },
      },
      {
        include: [{ model: Profile, attributes: ["firstName", "lastName"] }],
        transaction: t,
      }
    );

    const response = await User.findByPk(newUser.id, {
      include: [
        { model: Profile, attributes: ["firstName", "lastName"] },
        { model: Role, attributes: ["name"] },
      ],
      attributes: { exclude: ["password"] },
      transaction: t,
    });
    await t.commit();
    return res.sendSuccess(201, response);
  } catch (error) {
    console.log(error);
    t.rollback();
    res.sendServerError();
  }
};

module.exports = register;
