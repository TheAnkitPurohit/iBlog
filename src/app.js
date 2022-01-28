const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8000;

// Mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/contactBlog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

// For serving static files
const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));
app.use(express.urlencoded());

// Set view engine
const hbs = require("hbs");
app.set("view engine", "hbs");

// Templates Path
const templates_path = path.join(__dirname, "../templates/views");
app.set("views", templates_path);

// Partials Path
const PartialsPath = path.join(__dirname, "../templates/layouts");
hbs.registerPartials(PartialsPath);

// Router Path
const RouterPath = path.join(__dirname, "/router/routes.js");
app.use("/", require(RouterPath));

// START THE SERVER
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});
