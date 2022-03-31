const express = require('express');

// init app & middleware
const app = express()

app.listen(3000, () => {
    console.log('app listenting on port 3000')
});

// routes
app.get('/properties', (req, res) => {
    res.json(('welcome to the api'))
})
