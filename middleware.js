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