const express = require("express");
const Listing = require("../models/listing");
const { ObjectId } = require("mongodb");
require("dotenv").config({ path: "./config.env" });
const googleMapURI = process.env.GOOGLE_MAPS_URI;

const router = express.Router();

router.get("/", (req, res) => {
  Listing.find()
    .then((result) => {
      res.render("listings", { listings: result, googleMap: googleMapURI });
    })
    .catch((err) => {
      res.render("404");
    });
});

router.get("/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    Listing.findById(req.params.id)
      .then((result) => {
        res.render("listing", { listing: result, googleMap: googleMapURI });
      })
      .catch((err) => {
        res.render("404");
      });
  } else {
    res.status(500).json({ error: "Not a valid property ID" });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Listing.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/listings" });
    })
    .catch((err) => {
      res.render("404");
    });
});

module.exports = router;
