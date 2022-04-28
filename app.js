const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const nodemailer = require("nodemailer");

require("dotenv").config({ path: "./config.env" });
require("dotenv").config({ path: "./.env" });
const mongoose = require("mongoose");
const Listing = require("./models/listing");

const listingRoutes = require("./routes/listingsRoutes");
const adminRoutes = require("./routes/adminRoutes");

// init app & middleware
const app = express();
const dbURI = process.env.ATLAS_URI;
const email = process.env.EMAIL;
const password = process.env.PASS;

const port = process.env.PORT || 3000;

mongoose
  .connect(dbURI)
  .then((result) =>
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    })
  )
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware and static files
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true })); //accepting form data
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// routes
app.get("/", (req, res) => {
  Listing.find()
    .then((result) => {
      res.render("index", { listings: result });
    })
    .catch((err) => {
      res.render("404");
    });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/resources", (req, res) => {
  res.render("resources");
});

app.use(adminRoutes);

app.use("/listings", listingRoutes);

// Email forms
app.post("/", (req, res) => {
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: password,
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: email,
    subject: `Message from ${req.body.email}, ${req.body.name}`,
    text: req.body.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("Email sent: " + info.response);
      res.send("success");
    }
  });
});

app.use((req, res) => {
  res.status(404).render("404");
});
