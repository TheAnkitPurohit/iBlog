const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/contactBlog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); 
const port = process.env.PORT || 8000;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

// DEFINE MONGOOSE SCHEMA
const blogSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: String,
  concern: String,
});

const Contact = mongoose.model("Contact", blogSchema);

// EXPRESS SPECIFIC STUFF
app.use("/static", express.static("static")); // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set("view engine", "pug"); // Set the template engine as pug
app.set("views", path.join(__dirname, "views")); // Set the views directory

// ENDPOINTS
app.get("/", (req, res) => {
  const params = {};
  res.status(200).render("home.pug", params);
});

app.get("/about", (req, res) => {
  const params = {};
  res.status(200).render("about.pug", params);
});

app.get("/search", (req, res) => {
  const params = {};
  res.status(200).render("search.pug", params);
});

app.get("/blogpost", (req, res) => {
  const params = {};
  res.status(200).render("blogpost.pug", params);
});

app.get("/contact", (req, res) => {
  const params = {};
  res.status(200).render("contact.pug", params);
});

// Post ENDPOINTS

app.post("/contact", (req, res) => {
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

// START THE SERVER
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});
