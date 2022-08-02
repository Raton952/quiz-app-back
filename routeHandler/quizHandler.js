const express = require("express");
const mongoose = require("mongoose");
const checkLogin = require("../middlewares/checkLogin");
const router = express.Router();
const titleCollection = require("../schemas/titleCollectionSchema");
const Title = new mongoose.model("Title", titleCollection);

// title
router.post("/quiztitle", checkLogin, async (req, res) => {
  try {
    const newTitle = new Title(req.body);
    const response = await newTitle.save();

    res.status(200).json({
      message: "Title Add Successful!",
    });
    console.log(response);
  } catch {
    res.status(500).json({
      error: "Server Error!",
    });
  }
});

// get title

router.get("/quiztitle", checkLogin, async (req, res) => {
  try {
    await Title.find().exec((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          titles: data,
          message: "All Title",
        });
      }
    });
  } catch {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});

router.post("/question", (req, res) => {
  console.log(req.body);
});

module.exports = router;
