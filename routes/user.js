const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const User = require('../models/user.js');
const ExpressError = require('../utils/ExpressError.js');
const passport = require('passport'); 
const {saveRedirectUrl} = require('../middleware.js'); 
// const{ reviewSchema } = require('../schema.js'); 
// const Review = require('../models/review.js');
// const Listing = require("../models/listing.js");


router.get('/signup', (req, res) => {
    res.render('users/signup.ejs')
})

router.post('/signup', wrapAsync(async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const regiterestUser = await User.register(newUser, password)
        req.login(regiterestUser,(err)=>{
            if(err){
                return next(err); 
            }
            req.flash('success', "You're all set — your journey with Nivaasi begins now.");
            res.redirect('/listings');
        }); 
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/signup');
    }
}));

router.get('/login',(req,res)=>{
    res.render('users/login.ejs'); 
});

router.post('/login', saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login' , failureFlash: true}), async (req, res) => {
    req.flash('success',"Welcome back — make yourself at home.");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
    
});

router.get('/logout',(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash('success',"Logged Out!!");
        res.redirect('/listings'); 
    }); 
});

module.exports = router; 