const router = require("express").Router();
const User = require("../model/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { registerValidation, loginValidation } = require("../model/Validation");

dotenv.config();

router.post("/register", async (req, res) => {
  const userExist = await User.findOne({ name: req.body.name });
  if (userExist) return res.status(405).send("user already exist");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    password: hashPassword,
  });
  const tokenUserinfo = {
    user: req.body.name,
    status: "client",
  };
  const token = jwt.sign(tokenUserinfo, process.env.TOKEN_SECRET);
    res.header("Access-Control-Expose-Headers", "x-access-token");
    res.set("x-access-token", token);
    console.log(token)
  try {
    const savedUser = await user.save();
    res.send(savedUser);

    
    res.status(200).send({ details: "user connected" });
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
  const tokenUserinfo = {
    user: req.body.name,
    status: "client",
  };
  const token = jwt.sign(tokenUserinfo, process.env.TOKEN_SECRET);
  res.header("Access-Control-Expose-Headers", "x-access-token");
  res.set("x-access-token", token);
  res.status(200).send({ details: "user connected" });
});

const getToken = req => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1]
  } else if (req.query && req.query.token) {
    return req.query.token
  }
  return null
}

router.post('/protect' , (req, res) => { 
  const token = getToken(req)
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(200).send({ mess: token })
    }
    console.log('decode', decoded)
    return res.status(200).send({ message: 'autorise' })
  })
})

module.exports = router;
