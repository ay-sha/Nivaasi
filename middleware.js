const Listing = require("./models/listing.js");
const Review = require('./models/review.js');
const{ listingSchema, reviewSchema } = require('./schema.js'); 
const ExpressError = require('./utils/ExpressError.js');

module.exports.isLoggedIn = (req, res, next) => {
    //console.log(req.path);
    //console.log(req.originalUrl);
    if (!req.isAuthenticated()) {
        req.session.redirectUrl=req.originalUrl; 
        req.flash('error', "You need to be signed in");
        return res.redirect('/login');
    }
    next(); 
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl; 
    }
    next();  
}

module.exports.isOwner = async (req,res,next)=>{
    let { id } = req.params;
    let listing = await Listing.findById(id); 
    if(res.locals.currentUser && !listing.owner._id.equals(res.locals.currentUser._id)){
        req.flash('error',"Oops! You're not authorized to do that.");
        return res.redirect(`/listings/${id}`); 
    }
    next(); 
}
module.exports.isReviewAuthor = async (req,res,next)=>{
    let { id, reviewId } = req.params;
    let review  = await Review.findById(reviewId); 
    if(res.locals.currentUser && !review.author._id.equals(res.locals.currentUser._id)){
        req.flash('error',"Oops! You're not authorized to do that.");
        return res.redirect(`/listings/${id}`); 
    }
    next(); 
}


//validate Lisiting with Joi 
module.exports.validateListing =(req,res,next)=>{
    let {err} = listingSchema.validate(req.body);
    if(err){
        let errMsg = err.details.map((el)=>el.message).join(","); 
        throw new ExpressError(400,errMsg); 
    }
    else{
        next(); 
    }
}

//validate review with joi
module.exports. validateReview =(req,res,next)=>{
    let {err} = reviewSchema.validate(req.body);
    if(err){
        let errMsg = err.details.map((el)=>el.message).join(","); 
        throw new ExpressError(400,errMsg); 
    }
    else{
        next(); 
    }
}

