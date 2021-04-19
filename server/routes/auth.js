const router = require("express").Router();
const User = require("../model/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { registerValidation, loginValidation } = require("../model/Validation");

dotenv.config();

router.post("/register", async (req, res) => {
  const userExist = await User.findOne({ name: req.body.name });
  if (userExist) return res.status(400).send("email already exist");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const hashPasswordSd = await bcrypt.hash(req.body.passwordConfirm, salt);

  const user = new User({
    name: req.body.name,
    password: hashPassword,
    passwordConfirm: hashPasswordSd,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token)
    res.header('Access-Control-Expose-Headers', 'x-access-token')
    res.set('x-access-token', token)
  } catch (err) {
    res.status(400).send();
  }
});

// Login

router.post("/login", async (req, res) => {
  // verifier 
  const user = await User.findOne({ name: req.body.name });
  if (!user) return res.status(400).send("Email or password error");
  // verifier du mdp
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Email or password error");

  //Creation et assignation d'un token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token)
    res.header('Access-Control-Expose-Headers', 'x-access-token')
    res.set('x-access-token', token)
    res.send("login hohih");
});

module.exports = router;



