const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/contactDance');
}
const port = 80;
const bodyparser = require('body-parser');

// Define Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

// Schema into Model
const Contact = mongoose.model('contact', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); //For Serving The Static Files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // Set The Template Engine As Pug
app.set('views',path.join(__dirname, 'views')); //Set The Views Directory


// END POINTS
app.get('/',(req, res)=>{
    const params = { };
    res.status(200).render('home.pug', params);
})
app.get('/contact',(req, res)=>{
    const params = { };
    res.status(200).render('contact.pug', params);
})

app.post('/contact',(req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This data has been saved to the database")
    }).catch(() => {
        res.status(400).send("The data was not send to the database")
    });
    // res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
})