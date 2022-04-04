const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Listing = require('./models/listing')
const { ObjectId } = require('mongodb');
const { connectToDb, getDb } = require('./db');


// init app & middleware
const app = express()

const dbURI = 'mongodb+srv://BPM-admin:YFKlFyfpz49TozQC@cluster0.auuxc.mongodb.net/BPM?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))

// register view engine
app.set('view engine', 'ejs');

// db connection
// let db

// BPM-admin:YFKlFyfpz49TozQC

// connectToDb((err) => {
//     if (!err) {
//         app.listen(3000, () => {
//             console.log('app listenting on port 3000')
//         });
//         db = getDb()
//     }
// })

// middleware and static files
app.use(express.static(__dirname + '/public'))
app.use(morgan('dev'))


// routes
app.get('/', (req, res) => {
    res.render('index')
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

// app.get('/addListing', (req, res) => {
//     const listing = new Listing({
//         mainImageURL:
//         imageURLs:
//         imageAlts:
//         imageTextArray:
//         beds:
//         bath:
//         address:
//         city:
//         latitude:
//         longitude:
//         rent:
//         availability:
//         alt:
//         propertyInfo: {
//             icon:
//             title:
//             infoArray:
//         }
//     })
// })

app.get('/listings', (req, res) => {
    Listing.find()
        .then((result) => {
            res.render('propertySearch', { listings: result })
        })
        .catch((err) => {
            console.log(err)
        })

    // db.collection('listings')
    //     .find()
        // .skip(page * listingsPerPage)
        // .limit(listingsPerPage)
        // .forEach(listing => listings.push(listing))
    //     .then(() => {
    //         res.status(200).json(listings)
    //     })
    //     .catch(() => {
    //         res.status(500).json({error: 'Could not fetch listings'})
    //     })
    // console.log(listings)
    // res.render('propertySearch')
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

    // if (ObjectId.isValid(req.params.id)) {
    //     db.collection('listings')
    //         .findOne({_id: ObjectId(req.params.id)})
    //         .then(doc => {
    //             res.status(200).json(doc)
    //         })
    //         .catch(err => {
    //             res.status(500).json({error: 'Could not fetch document'})
    //         })
    // } else {
    //     res.status(500).json({error: 'Not a valid property ID'})
    // }
})

app.use((req, res) => {
    res.status(404).render('404')
})
