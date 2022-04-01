const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDb, getDb } = require('./db');

// init app & middleware
const app = express()

// register view engine
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'))

// db connection
let db

connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('app listenting on port 3000')
        });
        db = getDb()
    }
})

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/resources', (req, res) => {
    res.render('resources')
})

// routes
app.get('/listings', (req, res) => {
    // current page
    const page = req.query.p || 0;
    const listingsPerPage = 5;

    let listings = []

    db.collection('listings')
        .find()
        .skip(page * listingsPerPage)
        .limit(listingsPerPage)
        .forEach(listing => listings.push(listing))
        .then(() => {
            res.status(200).json(listings)
        })
        .catch(() => {
            res.status(500).json({error: 'Could not fetch listings'})
        })
    res.render('propertySearch')
})

app.get('/listings/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {
        db.collection('listings')
            .findOne({_id: ObjectId(req.params.id)})
            .then(doc => {
                res.status(200).json(doc)
            })
            .catch(err => {
                res.status(500).json({error: 'Could not fetch document'})
            })
    } else {
        res.status(500).json({error: 'Not a valid property ID'})
    }
})
