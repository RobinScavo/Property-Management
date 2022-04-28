const express = require("express");
const Listing = require("../models/listing");
const { ObjectId } = require("mongodb");

const router = express.Router();

router.get("/admin", (req, res) => {
  Listing.find()
    .then((result) => {
      res.render("admin", { listings: result });
    })
    .catch((err) => {
      res.render("404");
    });
});

router.get("/admin-create", (req, res) => {
  res.render("admin-create");
});

router.post("/admin-create", (req, res) => {
  let imageAltArray;
  if (req.body.imageTextArray && req.body.imageTextArray.length > 1) {
    imageAltArray = [req.body.mainImageText, ...req.body.imageTextArray];
  } else if (req.body.imageTextArray && req.body.imageTextArray.length === 1) {
    imageAltArray = [req.body.mainImageText, req.body.imageTextArray];
  } else {
    imageAltArray = [];
  }

  const newListing = {
    mainImageURL: req.body.mainImageURL || "../images/unavailable.jpeg",
    imageURLs: req.body.imageURLs || ["../images/unavailable.jpeg"],
    imageAlts: imageAltArray,
    imageTextArray: req.body.imageTextArray || "No Image Available",
    beds: +req.body.bed,
    bath: +req.body.bath,
    address: req.body.address,
    city: req.body.city,
    latitude: 0,
    longitude: 0,
    rent: +req.body.rent,
    deposit: +req.body.deposit,
    availability: req.body.availability,
    alt: req.body.alt || "No Image Available",
    propertyInfo: {
      BedsBath: [`${req.body.bed} Bedroom`, `${req.body.bath} Bathroom`],
      Utilities: [req.body.utilities],
      Pets: req.body.pets,
      Rent: [`${req.body.rent} monthly`, `${req.body.deposit} deposit`],
      Footage: [`${req.body.footage} sq. feet`],
      Appliances: req.body.appliances,
      Design: req.body.design,
      Amenities: req.body.amenities,
    },
  };

  const listing = new Listing(newListing);

  listing
    .save()
    .then((result) => {
      res.redirect("/listings");
    })
    .catch((err) => {
      res.render("404");
    });
});

router.get("/admin-edit/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    Listing.findById(req.params.id)
      .then((result) => {
        res.render("admin-edit", { listing: result });
      })
      .catch((err) => {
        res.render("404");
      });
  } else {
    res.status(500).json({ error: "Not a valid property ID" });
  }
});

router.post("/admin-edit/:id", (req, res) => {
  const updates = req.body;

  console.log(req.body);

  if (ObjectId.isValid(req.params.id)) {
    Listing.updateOne({ id: ObjectId(req.params.id) }, { $set: updates })
      .then((result) => {
        res.redirect("/listings");
      })
      .catch((err) => {
        res.render("404");
      });
  } else {
    res.status(500).json({ error: "Not a valid property ID" });
  }
});

module.exports = router;
