const express = require("express");
const path = require("path");
const app = express();
// const blogs = require("../data/blogs");

const router = express.Router();

// Endpoints
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

router.get("/blogpost", (req, res) => {
  res.render("blogpost");
});

router.get("/search", (req, res) => {
  res.render("search");
});

// Post ENDPOINTS

router.post("/contact", (req, res) => {
  var myData = new Contact(req.body);
  myData
    .save()
    .then(() => {
      res.send("Your form has been successfully submitted");
    })
    .catch(() => {
      res.status(400).send("Your form has not been submitted");
    });
});

module.exports = router;
