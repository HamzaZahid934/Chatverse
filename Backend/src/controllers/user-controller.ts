import userModel from "../models/user-model.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import path from "path";
import { Domain } from "domain";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (req, res, next) => {
  try {
    //get all users
    const users = await userModel.find();
    return res.status(200).json({ message: "success", users });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "error", cause: error.message });
  }
};

export const userSignup = async (req, res, next) => {
  try {
    //user signup
    const { name, email, password } = req.body;

    //check user is exisiting or not
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) return res.status(401).send("user already exists");

    //pasword encrypted
    const hasedPassword = await hash(password, 10);
    const user = new userModel({ name, email, password: hasedPassword });
    await user.save();
    //create token and store cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    const token = createToken(user._id.toString(), user.email, "7D");
    //set cookie expiry
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    //user id send
    return res
      .status(201)
      .json({ message: "success", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "error", cause: error.message });
  }
};

export const userLogin = async (req, res, next) => {
  try {
    //user login
    const { email, password } = req.body;
    //check user is exisiting or not
    const user = await userModel.findOne({ email });
    if (!user) return res.status(401).send("user not found");
    //check password
    const isPasswordMatch = await compare(password, user.password);
    if (!isPasswordMatch) return res.status(403).send("Incorrect password");
    // clear cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    const token = createToken(user._id.toString(), user.email, "7D");
    //set cookie expiry
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });
    return res
      .status(200)
      .json({ message: "success", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "error", cause: error.message });
  }
};

export const verifyUser = async (req, res, next) => {
  try {
    //user login

    //check user is exisiting or not
    const user = await userModel.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("user not found or token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send(" permission denied");
    }
    return res
      .status(200)
      .json({ message: "success", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "error", cause: error.message });
  }
};

export const userLogout = async (req, res, next) => {
  try {
    //user login

    //check user is exisiting or not
    const user = await userModel.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("user not found or token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send(" permission denied");
    }
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    return res
      .status(200)
      .json({ message: "success", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "error", cause: error.message });
  }
};
