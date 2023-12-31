// Register and login
const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Endpoint - Register user using post method
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    // Encrypting password
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
    // password: req.body.password
  });

  try {
    // Mongoose UserSchema saves newUser to DB
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Validiates password
function validate_password(encryptedPassword, enteredPassword) {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, process.env.SECRET_KEY);
  const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
  return originalPassword !== enteredPassword;
}

// Endpoint - User login using post method
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // Validating user and password
    if (!user || validate_password(user.password, req.body.password)) {
      res.status(401).json("Wrong password or username");
    } else {
      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.SECRET_KEY,
        { expiresIn: "5d" }
      );

      // Sending back accessToken with all information 
      // except the password
      const { password, ...info } = user._doc;
      res.status(200).json({...info, accessToken});
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
