const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/StudentSchema");

// @desc : register new user
// @route: POST /users/register
// @access: public
const register = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Enter all details");
  }
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already Exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const user = await userModel.create({
    name,
    email,
    type: 'user',
    password: hashedPass,
  });

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateJwt(user._id),
  });
});

// @desc : login as user
// @route: POST /users/login
// @access: public
const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Enter all details");
  }
  const user = await userModel.findOne({
    email,
  });
  if (user && await bcrypt.compare(password, user.password)) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      type: 'user',
      token: generateJwt(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Wrong credentials");
  }
});

// @desc : details of loggedin user
// @route: GET /users/me
// @access: private
const getMe = expressAsyncHandler(async (req, res) => {
    const { name, email, _id } = req.user;
    res.status(200).json({
      id: _id,
      name,
      type: 'user',
      email,
    });
  });

const generateJwt = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30m" });
};

module.exports = {
  login,
  register,
  getMe
};
