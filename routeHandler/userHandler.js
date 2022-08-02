const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const userSchema = require("../schemas/userSchema");
const User = new mongoose.model("User", userSchema);

// SIGNUP

router.post("/", async (req, res) => {
  try {
    const hasePass = await bcrypt.hash(req.body.password, 10);
    const user = await User.find({ email: req.body.email });

    if (user && user.length === 1) {
      res.status(400).json({
        error: "Email Already already Exist",
      });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hasePass,
      });
      await newUser.save();
      res.status(200).json({
        message: "Signup Successful!",
      });
    }
  } catch {
    res.status(500).json({
      error: "Signup failed!",
    });
  }
});

// login

router.post("/login", async (req, res) => {

  try {
    const user = await User.find({ email: req.body.email });

    if (user[0] && user.length > 0) {

      const isValidPass = await bcrypt.compare(
        req.body.password,
        user[0].password
      );

      if (isValidPass) {
        // genarate token
        const token = jwt.sign(
          {
            username: user[0].username,
            userId: user[0]._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "2d" }
        );


        res.status(200).json({
          user: {access_token: token,email:user[0].email,id:user[0]._id,statu:user.status} ,
          message: "Login Successfull",
        });
      } else {
        res.status(401).json({
          error: "Authetication Faild! 1",
        });
      }
    } else {
      res.status(401).json({
        error: "Authetication Faild! 2",
      });
    }
  } catch {
    res.status(401).json({
      error: "Authetication Faild! 3",
    });
  }
});

module.exports = router;
