const express = require("express");
const path = require("path");
const app = express();
// getting-started.js
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/StrakTower', { useNewUrlParser: true });
port = 80;


// definre mongoose schima 
const contactSchema = new mongoose.Schema({
    Name: String,
    email: String,
    Conatct: String,
    Address: String,
    
});
const contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STAUF
app.use(`/static`, express.static(`static`));
app.use(express.urlencoded())
// PUG specific stufF
app.set(`view engine`, `pug`)// set the template ingine
app.set(`views`, path.join(__dirname, `views`))  // set the view directory 
// ENDPOINTS
app.get(`/`, (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
});
app.get(`/contact`, (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
});
app.post(`/contact`, (req, res) => {
    var mydata = new contact(req.body);
    mydata.save().then(() => {
        res.send("Keep Smiling , Your data has been Summited  Sucessfully ");
    }).catch(() => {
        res.status(404).send("Your data was not sumiited Sucessfully ");
    })
    // res.status(200).render('contact.pug'); 
});
// START THE SERVER 
app.listen(port, () => {
    console.log(`The applicationtarted sucessfully on port ${port}`)
})
