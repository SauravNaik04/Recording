import userModel from "../model/userModel.js";
import JWT from "jsonwebtoken";

export const userLogin = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(404).send({
        success: false,
        message: "Invalid Name or Email Id",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const username = await userModel.findOne({ name });
    if (!username) {
      return res.status(404).send({
        success: false,
        message: "Invalid Name",
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });

    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

export const userRegister = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name) {
      return res.status(500).send({ message: "Name is required" });
    }
    if (!email) {
      return res.status(500).send({ message: "Email is required" });
    }

    const regUser = await userModel.findOne({ email });
    if (regUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered email",
      });
    }

    const user = await new userModel({
      name,
      email,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Sign in",
      error,
    });
  }
};

export const testController = (req, res) => {
  try {
    res.send("protected Route");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
