const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require('../utils/wrapAsync.js');
const{ listingSchema } = require('../schema.js'); 
const ExpressError = require('../utils/ExpressError.js');
const Listing = require("../models/listing.js");
const Review = require('../models/review.js');
const {isLoggedIn} = require('../middleware.js'); 


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

//Index
router.get('/', wrapAsync( async (req, res) => {
    const allListing = await Listing.find({});
    res.render('./listings/index.ejs', { allListing });
}));

//New
router.get('/new', isLoggedIn, (req, res) => {
    console.log(req.user);
    res.render('./listings/new.ejs');
});

//Show
router.get('/:id', wrapAsync( async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate('reviews').populate('owner');
    //console.log(currentUser);
    //console.log(listing.owner); 
    if(!listing){
        req.flash('error',"Listing doesn't exist!");
        return res.redirect('/listings'); 
    }
    res.render('./listings/show.ejs', { listing });
}));

//Create
router.post('/', isLoggedIn, validateListing, wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id; 
    await newListing.save();
    req.flash('success','New Listing Created!');
    res.redirect('/listings');

}));

//Edit
router.get('/:id/edit',isLoggedIn, wrapAsync( async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash('error',"Listing doesn't exist!");
        return res.redirect('/listings'); 
    }
    res.render('./listings/edit.ejs', { listing });
}));

//update
router.put('/:id',isLoggedIn, validateListing, wrapAsync (async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash('success','Listing Updated!');
    res.redirect(`/listings/${id}`)
}));

//delete
router.delete('/:id',isLoggedIn, wrapAsync( async (req, res) => {
    let { id } = req.params;
    let deltedListings = await Listing.findByIdAndDelete(id);
    req.flash('success','Listing Deleted!');
    res.redirect('/listings');
}));

module.exports = router; 