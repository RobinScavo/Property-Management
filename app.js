const express = require('express');
const morgan = require('morgan');
const cors = require("cors");

const mongoose = require('mongoose');
const Listing = require('./models/listing');

const listingRoutes = require('./routes/listingsRoutes');
const adminRoutes = require('./routes/adminRoutes');

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
app.use(cors());


// routes
app.get('/', (req, res) => {
    Listing.find()
    .then((result) => {
        res.render('index', { listings: result })
    })
    .catch((err) => {
        res.render('404')
    })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/resources', (req, res) => {
    res.render('resources')
})

app.use(adminRoutes);

app.use('/listings', listingRoutes);

app.use((req, res) => {
    res.status(404).render('404')
})
