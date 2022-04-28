const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema(
  {
    mainImageURL: {
      type: String,
      required: true,
    },
    imageURLs: {
      type: Array,
      required: true,
    },
    imageAlts: {
      type: Array,
      required: true,
    },
    imageTextArray: {
      type: Array,
      required: true,
    },
    beds: {
      type: Number,
      required: true,
    },
    bath: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    availability: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    propertyInfo: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
