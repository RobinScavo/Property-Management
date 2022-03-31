const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDb, getDb } = require('./db');

// init app & middleware
const app = express()

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

// routes
app.get('/listings', (req, res) => {
    let listings = []

    db.collection('listings')
        .find() //filter by first 5
        .forEach(listing => listings.push(listing))
        .then(() => {
            res.status(200).json(listings)
        })
        .catch(() => {
            res.status(500).json({error: 'Could not fetch listings'})
        })
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
