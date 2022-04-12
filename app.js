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
app.use(express.urlencoded({ extended: true }));
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

app.post('/addListing', (req, res) => {
    console.log(req.body)
})

app.get('/addListing', (req, res) => {
    // const listing = new Listing({
    //     mainImageURL: '../images/gallery/2-pexels-luis-quintero-2564873.jpg',
    //     imageURLs: ['../images/gallery/2-pexels-luis-quintero-2564873.jpg','../images/property-images/bathroom.jpg', '../images/property-images/bedroom.jpg', '../images/property-images/kitchen.jpg', '../images/property-images/living-room.jpg', '../images/property-images/dining-room.jpg'],
    //     imageAlts: ['Luis Quintero from NounProject.com','dining room, stefygutovska from NounProject.com', 'bedroom, credit Carol M. Highsmith from NounProject.com', 'living room, by Suzanne Strong from NounProject.com', 'kitchen, by Jacob Lund Photography from NounProject.com'],
    //     imageTextArray: ['Central Location','Full Bathroom', 'Spacious Bedrooms','Modern Kitchen','Comfortable Layout', 'Furnished Apartment'],
    //     beds: 4,
    //     bath: 3,
    //     address: 'Rock Creek, APT 31, 2323 32nd St W',
    //     city: 'Billings, MT',
    //     latitude: 45.761320,
    //     longitude: -108.578710,
    //     rent: 1800,
    //     availability: 'Available NOW!',
    //     alt:   'Luis Quintero from NounProject.com',
    //     propertyInfo: {
    //         BedsBath: ['1 Bedroom', '1 Bathroom'],
    //         Utilities: '$35 utility fee which includes water, sewer, and trash.',
    //         Pets: ['Cats', 'Small dogs'],
    //         Rent: ['$800 monthly', '$1000 deposit'],
    //         Footage: '550 sq. feet',
    //         Appliances: ['Stove', 'Refrigerator', 'Dishwasher', 'Washer and Dryer'],
    //         Design: ['Sunny', 'Efficiency', 'Air Conditioning', 'Bike Storage'],
    //         Amenities: ['Off-street Parking', 'Walking distance to shopping & restaurants', 'Storage units for $10/month']
    //     }
    // });

    // listing.save()
    //     .then((result) => {
    //         res.send(result)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    res.render('addListing')
})

app.use((req, res) => {
    res.status(404).render('404')
})
