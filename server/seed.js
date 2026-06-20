import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";
import User from "./models/User.js";
import connectDB from "./db/connection.js";

const register = async () => {
  try {
    await connectDB();

    const existingUser = await User.findOne({
      email: "admin@gmail.com",
    });

    if (existingUser) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(
      "admin",
      10
    );

  const newUser = new User({
  name: "Admin User",
  email: "admin@gmail.com",
  password: hashedPassword,
  phone: "9876543210",
  role: "Admin",
  status: "Active",
});

    await newUser.save();

    console.log(
      "Admin registered successfully"
    );

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

register();