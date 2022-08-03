const express = require("express");
const mongoose = require("mongoose");
const checkLogin = require("../middlewares/checkLogin");
const router = express.Router();
const titleCollection = require("../schemas/titleCollectionSchema");
const questionCollection = require("../schemas/questionCollection");
const Title = new mongoose.model("Title", titleCollection);
const Question = new mongoose.model("Question", questionCollection);

// title
router.post("/quiztitle", checkLogin, async (req, res) => {
  try {
    const newTitle = new Title(req.body);
    await newTitle.save();

    res.status(200).json({
      message: "Title Add Successful!",
    });
  } catch {
    res.status(500).json({
      error: "Server Error!",
    });
  }
});

// get title

router.get("/quiztitle",  async (req, res) => {
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

// post question

router.post("/question", checkLogin, async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    const result = await newQuestion.save();

    res.status(200).json({
      question: result,
      message: "Question Add Successfully!",
    });

    console.log(result);
  } catch {
    res.status(500).json({
      error: "There was a server side error!!",
    });
  }
});

// get quiz with title id

router.get("/question/:id", checkLogin, async (req, res) => {
  const id = req.params.id;

  try {
    await Question.find({ titleId: id }).exec((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          questions: data,
          message: "All Questions",
        });
      }
    });
  } catch {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});
// get correct answer

router.get("/answer/:id", checkLogin, async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Question.find({ titleId: id })
      .select({
        titleId: 0,
        question: 0,
        options: 0,
        userAnswer: 0,
      })
      .exec((err, data) => {
        if (err) {
          res.status(500).json({
            error: "There was a server side error!",
          });
        } else {
          res.status(200).json({
            answers: data,
            message: "All Questions",
          });
        }
      });

  } catch {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});

module.exports = router;
