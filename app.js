const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Listing = require('./models/listing')
const { ObjectId } = require('mongodb');
// const { connectToDb, getDb } = require('./db');


// init app & middleware
const app = express()

const dbURI = 'mongodb+srv://BPM-admin:YFKlFyfpz49TozQC@cluster0.auuxc.mongodb.net/BPM?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))

// register view engine
app.set('view engine', 'ejs');

// BPM-admin:YFKlFyfpz49TozQC

// middleware and static files
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true })); //accepting form data
app.use(morgan('dev'));


// routes
app.get('/', (req, res) => {
    Listing.find()
    .then((result) => {
        res.render('index', { listings: result })
    })
    .catch((err) => {
        console.log(err)
    })
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/resources', (req, res) => {
    res.render('resources')
})

app.get('/admin', (req, res) => {
    Listing.find()
        .then((result) => {
            res.render('admin', { listings: result })
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/admin-edit/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        Listing.findById(req.params.id)
            .then((result) => {
                res.render('adminEdit', {listing: result })
            })
            .catch((err) => {
                console.log(err)
            })
    } else {
        res.status(500).json({error: 'Not a valid property ID'})
    }
})

app.get('/listings', (req, res) => {
    Listing.find()
        .then((result) => {
            res.render('propertySearch', { listings: result })
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/listings/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        Listing.findById(req.params.id)
            .then((result) => {
                res.render('propertyDetail', {listing: result })
            })
            .catch((err) => {
                console.log(err)
            })
    } else {
        res.status(500).json({error: 'Not a valid property ID'})
    }
})

app.get('/addListing', (req, res) => {
    res.render('addListing')
})

app.post('/addListing', (req, res) => {
    let imageAltArray
    if (req.body.imageTextArray && req.body.imageTextArray.length > 1) {
        imageAltArray = [req.body.mainImageText, ...req.body.imageTextArray]
    } else if (req.body.imageTextArray && req.body.imageTextArray.length === 1) {
        imageAltArray = [req.body.mainImageText, req.body.imageTextArray]
    } else {
        imageAltArray = [];
    }

    let imageURLArray
    if (!req.body.imageURLs) imageURLArray = []
    let imageTexts
    if (!req.body.imageTextArray) imageTexts = []

    const newListing = {
        mainImageURL: req.body.mainImageURL,
        imageURLs: imageURLArray || imageURLArray,
        imageAlts: imageAltArray,
        imageTextArray: req.body.imageTextArray || imageTexts,
        beds: +req.body.bed,
        bath: +req.body.bath,
        address: req.body.address,
        city: req.body.city,
        latitude: 0,
        longitude: 0,
        rent: +req.body.rent,
        deposit: +req.body.deposit,
        availability: req.body.availability,
        alt: req.body.mainImageText,
        propertyInfo: {
            BedsBath: [`${req.body.bed} Bedroom`, `${req.body.bath} Bathroom`],
            Utilities: [req.body.utilities],
            Pets: req.body.pets,
            Rent: [`${req.body.rent} monthly`, `${req.body.deposit} deposit`],
            Footage: [`${req.body.footage} sq. feet`],
            Appliances: req.body.appliances,
            Design: req.body.design,
            Amenities: req.body.amenities
        }
    }
    console.log(newListing)
    const listing = new Listing(newListing);

    listing.save()
        .then((result) => {
            res.redirect('/listings')
        })
        .catch((err) => {
            console.log(err)
        })
})

app.use((req, res) => {
    res.status(404).render('404')
})
