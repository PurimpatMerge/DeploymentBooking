import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import * as nodemailer from "nodemailer";
import express from "express";

const app = express();
app.set("View engine", "ejs");

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};
export const registerAdmin = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      isAdmin: true,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

export const forgetPassword = async (req, res, next) => {
  try {
    const emailCheck = await User.findOne({ email: req.body.email });
    if (!emailCheck) {
      return res.send("This Email doesn't Exists");
    }
    const secret = process.env.JWT + emailCheck.password;
    const token = jwt.sign(
      { email: emailCheck.email, id: emailCheck._id },
      secret,
      { expiresIn: "5m" }
    );
    const link = `https://api-pool-villa.onrender.com//api/auth/reset-Password/${emailCheck._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "mergeofficial@hotmail.com",
        pass: "qgsfqivlbbsovqhu",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    var mailOptions = {
      from: "mergeofficial@hotmail.com",
      to: req.body.email,
      subject: "Password reset Merge pool villa",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).send(link);
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  const { id, token } = req.params;
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.status(403).send("undefind");
  }
  const secret = process.env.JWT + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    if (!verify) {
      return res.status(403).send("Not verfied");
    }
    res.render("reset.ejs", { email: verify.email });
  } catch (err) {
    next(err);
  }
};
export const resetPasswordafter = async (req, res, next) => {
  const { id, token } = req.params;
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.status(403).send("undefind");
  }
  const secret = process.env.JWT + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    if (!verify) {
      return res.status(403).send("Not verfied");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: hash,
        },
      }
    );
    res.status(200).send("Password change.");
  } catch (err) {
    next(err);
  }
};
