import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const login = async (
  req,
  res
) => {
  try {
    console.log(
      "BODY:",
      req.body
    );

    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({
        email,
      });

    console.log(
      "USER:",
      user
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid User",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message:
          "Password Missing",
      });
    }
console.log("Password entered:", password);
console.log("Hash in DB:", user.password);

const isMatch = await bcrypt.compare(
  password,
  user.password
);

console.log("isMatch =", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        "Server Error",
    });
  }
};

export { login };