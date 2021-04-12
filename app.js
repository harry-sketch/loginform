const express = require("express");
const app = express();
const path = require("path");
const port = 5000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
mongoose.connect('mongodb://localhost/contactgym', {useNewUrlParser: true, useUnifiedTopology: true});

// Creating Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: String,
    message: String,
  });

const Contact = mongoose.model('Contact', contactSchema);

// Serving static files with Express;
app.use("/static", express.static('static'));
app.use(express.urlencoded());

// Pug template engine;
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


// End Points;
app.get('/', (req, res) => {
    res.status(200).render('index.pug');
});
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
     myData.save().then(()=>{
         res.send("Item has been saved to the database");
        
     }).catch(()=>{
         res.status(400).send("Item was not saved")
     })
    
});



// Starting the server;
app.listen(port, () => {
    console.log(`The port started successfully on ${port}`);
});