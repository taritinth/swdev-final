const bcrypt = require("bcrypt");
const { User } = require("../models/users.model");
const { generateToken } = require("../helper");

const authLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  try {
    if (!user) {
      throw new Error("Incorrect username or password");
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error("Incorrect username or password");
    }

    const accessToken = generateToken({
      id: user._id,
      email: user.email,
      type: user.type,
    });
    return res.json({
      user: {
        token: accessToken,
      },
    });
  } catch (error) {
    res.status(400).json(error.toString());
  }
};

const authSignup = async (req, res) => {
  let { fullname, email, password, type } = req.body;
  password = await bcrypt.hash(password, 5);
  const newUser = new User({ fullname, email, password, type });
  newUser
    .save()
    .then(() =>
      res.json({
        message: "User added",
        success: true,
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

const authMe = async (req, res) => {
  const { email } = req.user;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(401).json({
      message: "Invalid User",
      success: false,
    });
  }
  // console.log("authMe: ", req.user);
  return res.json({
    id: user._id,
    email: user.email,
    type: user.type,
    fullname: user.fullname,
    profileImg: user.profileImg,
    updatedAt: user.updatedAt,
  });
};

module.exports = { authLogin, authMe, authSignup };
