const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const tutorModel = require("../models/tutorSchema");

// @desc : register new user
// @route: POST /users/register
// @access: public
const registerTeacher = expressAsyncHandler(async (req, res) => {
  const { name, email, password, skills, education } = req.body;
  console.log(name, email, password, skills, education)
  if (!name || !email || !password || !skills || !education) {
    res.status(400);
    throw new Error("Enter all details");
  }
  const tutorExists = await tutorModel.findOne({ email });
  if (tutorExists) {
    res.status(400);
    throw new Error("tutor already Exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const tutor = await tutorModel.create({
    name,
    email,
    password: hashedPass,
    skills,
    education,
  });

  res.json({
    _id: tutor._id,
    name: tutor.name,
    email: tutor.email,
    type: "tutor",
    skills: tutor.skills,
    education: tutor.education,
    token: generateJwt(tutor._id),
  });
});

// @desc : login as user
// @route: POST /users/login
// @access: public
const loginTeacher = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Enter all details");
  }
  const tutor = await tutorModel.findOne({
    email,
  });
  if (tutor && (await bcrypt.compare(password, tutor.password))) {
    res.json({
      _id: tutor.id,
      name: tutor.name,
      email: tutor.email,
      type: "tutor",
      token: generateJwt(tutor.id),
      skills: tutor.skills,
      education: tutor.education,
    });
  } else {
    res.status(400);
    throw new Error("Wrong credentials");
  }
});

// @desc : details of loggedin user
// @route: GET /users/me
// @access: private
const getTeacher = expressAsyncHandler(async (req, res) => {
  const { name, email, _id, skills, education } = req.user;
  res.status(200).json({
    id: _id,
    name,
    email,
    type: "tutor",
    skills,
    education,
  });
});

const generateJwt = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30m" });
};

module.exports = {
  registerTeacher,
  loginTeacher,
  getTeacher,
};
