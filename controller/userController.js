const jwt = require("jsonwebtoken");
const UserModal = require("../models/User.js");
const bcrypt = require("bcrypt");

exports.Signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const userExist = await UserModal.findOne({ email });
    if(userExist){
        return res.status(300).json({
            success:true,
            message: "User already exist"
        })
    }
    const hashPassword = await bcrypt.hash(password, 10);
    

    const user = await UserModal.create({
      email,
      password: hashPassword,
      username,
    });
    res.status(200).json({
      success: true,
      message: "User is Registered",
      UserData: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `User not registered ${error}`,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ((!email, !password)) {
      res.json({
        success: false,
        message: "Input data are missing",
      });
    }

    const userexist = await UserModal.findOne({ email });
    if (!userexist) {
      res.json({
        success: false,
        message: "Email not found Please signup",
      });
    }
    let token;
    if (bcrypt.compare(password, userexist.password)) {
      token = jwt.sign(
        { email: userexist.email, id: userexist._id },
        "Anurag",
        {
          expiresIn: "24h",
        }
      );
    }

    // console.log(token);

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.cookie("token", token, options).json({
      success: true,
      userexist,
      message: "Succesfully logined in ",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `User not login ${error}`,
    });
  }
};
