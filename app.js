const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate');
const Listing = require("./models/listing.js");
const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError = require('./utils/ExpressError.js');
const connectDB = require('./config/db.js'); 
const listingRouter = require('./routes/listing.js');
const reviewRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js');
const session = require('express-session'); 
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');
const store = MongoStore.create({ 
    mongoUrl: process.env.MONGO_URL,
    touchAfter: 24*60*60  //sec
});
store.on('error',()=>{
    console.log('Error in Mongo Session Store',err)
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, //milisec
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
//session and flash
app.use(session(sessionOptions));
app.use(flash());
//authentication with passport 
app.use(passport.initialize()); 
app.use(passport.session()); 
passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//DB connection
connectDB();

//middleware for flashmsg
app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user; 
    next(); 
});


//Root 
app.get('/', wrapAsync( async (req, res) => {
    const allListing = await Listing.find({});
    res.render('./listings/home.ejs', { allListing }); 
})); 

//listings
app.use('/listings', listingRouter); 

//review
app.use('/listings/:id/reviews',reviewRouter);

//user
app.use('/',userRouter);


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
