const jwt = require("jsonwebtoken");
require("dotenv").config();
const {BadRequestError} = require("../errors");
const login = async (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password);
  if (!username || !password) {
    throw new BadRequestError("please provide username and password");
  }
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "User Created", token });
};

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    
    res.status(200).json({
      msg: "Hello, " + req.user.username,
      secret:
        "Here is your authorized data, your lucky number is " + luckyNumber,
    });
 
};

module.exports = { login, dashboard };
