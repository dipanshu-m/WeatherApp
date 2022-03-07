const exp = require('constants');
const express = require('express');
const path = require('path');
const app = express();
const { forecast } = require('./data');
// const fs= require('fs');

app.use(express.json());
app.use(express.static('./public'));
//parse form data
app.use(express.urlencoded({ extended: false }))

const port = process.env.PORT || 5000;
// ...
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});

app.get('/', (req, res, next) => {
    res.status(200);
    res.sendFile(path.resolve(__dirname, '.index.html'));
})

app.get('/home', (req, res) => {
    res.status(200);
    res.sendFile(__dirname + '/public/index.html');
})

app.get('/api', (req, res) => {
    res.status(200);
    res.sendFile(__dirname + "/data.js");
})
app.get('/api/locations', (req, res) => {
    res.status(200).json({ success: true, data: forecast })
})

app.post('/api/Location', (req, res) => {
    res.status(200);
    const q = req.body.location;
    const searchresult = forecast.find(
        (item) => {
            if ((item.location) === q) {
                return res.json({ success: true, data: item })
                // return res.sendFile(__dirname + '/public/search.html')
            }
        })
    if (!searchresult) {
        return res.json({ success: false, msg: "Please enter the location once again" })
        // res.sendFile(__dirname + '/public/search.html')
    }
})


app.get('/api/search', (req, res) => {
    res.status(200);
    const {q}= req.query;
    //console.log(q);
    const searchresult = forecast.find(
        (item) => {
            if ((item.location) === q) {
                return res.json({ success: true, data: item })
                // return res.sendFile(__dirname + '/public/search.html')
            }
        })
    if (!searchresult) {
        return res.json({ success: false, msg: "Please enter the location once again" })
        // res.sendFile(__dirname + '/public/search.html')
    }
})


// res.json(location.location);

app.all('*', (req, res) => {
    res.send("OOPS! Thats a 404!");
})