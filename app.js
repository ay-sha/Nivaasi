const express = require('express');
const app = express();
const port = process.env.port || 3000; 
const path = require('path');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate');
const Listing = require("./models/listing.js");
const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError = require('./utils/ExpressError.js');
const connectDB = require('./config/db.js'); 
const listings = require('./routes/listing.js');
const reviews = require('./routes/review.js');
const session = require('express-session'); 
const flash = require('connect-flash');
const sessionOptions = {
    secret: 'mysecrectstring',
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000 ,
        httpOnly: true
    }
}



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sessionOptions));
app.use(flash());
require('dotenv').config();

//DB connection
connectDB();

//Root 
app.get('/', wrapAsync( async (req, res) => {
    const allListing = await Listing.find({});
    res.render('./listings/home.ejs', { allListing });
})); 

app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next(); 
});

//listings
app.use('/listings', listings); 

//review
app.use('/listings/:id/reviews',reviews);



//default response
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
