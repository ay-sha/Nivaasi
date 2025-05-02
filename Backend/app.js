const express = require('express');
const app = express();
const port = process.env.port || 3000; 
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate');
const MONGO_URL = process.env.MONGO_URL;
//const MONGO_URL = "mongodb://127.0.0.1:27017/nivaasi";
const Listing = require("./models/listing.js")
const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError = require('./utils/ExpressError.js');
const{ listingSchema } = require('./schema.js'); 
const connectDB = require('./config/db.js'); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../Frontend/views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "../Frontend/public")));
require('dotenv').config();

//DB connection
connectDB()

app.get('/', (req, res) => {
    res.send('Root');
})

//validate Lisiting with Joi 
const validateListing =(req,res,next)=>{
    let {err} = listingSchema.validate(req.body);
    if(err){
        let errMsg = err.details.map((el)=>el.message).join(","); 
        throw new ExpressError(400,errMsg); 
    }
    else{
        next(); 
    }
}

//Routes with wrapAsync

//Index
app.get('/listings', wrapAsync( async (req, res) => {
    const allListing = await Listing.find({});
    res.render('./listings/index.ejs', { allListing });
}));

//New
app.get('/listings/new', (req, res) => {
    res.render('./listings/new.ejs');
});

//Show
app.get('/listings/:id', wrapAsync( async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('./listings/show.ejs', { listing });
}));

//Create
app.post('/listings', validateListing, wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings');

}));

//Edit
app.get('/listings/:id/edit', wrapAsync( async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('./listings/edit.ejs', { listing });
}));

//update
app.put('/listings/:id',validateListing, wrapAsync (async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`)
}));

//delete
app.delete('/listings/:id',wrapAsync( async (req, res) => {
    let { id } = req.params;
    let deltedListings = await Listing.findByIdAndDelete(id);
    console.log(deltedListings);
    res.redirect('/listings');
}));

app.all(/./, (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

//custom middleware

app.use((err, req, res, next) => {
    let { status=500, message='Something Went Wrong' } = err;
    // res.status(status).send(message);
    res.status(status).render('error.ejs',{err}); 
});


app.listen(port, () => {
    console.log('server is lisening to 3000');
})
