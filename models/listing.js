const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    mainImageURL: {
        type: String,
        required: true
    },
    imageURLs: {
        type: Array,
        required: true
    },
    imageAlts: {
        type: Array,
        required: true
    },
    imageTextArray: {
        type: Array,
        required: true
    },
    beds: {
        type: Number,
        required: true
    },
    bath: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    rent: {
        type: Number,
        required: true
    },
    availability: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        required: true
    },
    propertyInfo: {
        icon: {
            type: String,
            required:true
        },
        title: {
            type: String,
            required:true
        },
        infoArray: {
            type: Array,
            required:true
        }
    },
})

const Listing = mongoose.model('Listing', listingSchema)

module.exports = Listing;
