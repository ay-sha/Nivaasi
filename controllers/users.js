const User = require('../models/user.js');

module.exports.renderSignUpFrom = (req, res) => {
    res.render('users/signup.ejs')
};
module.exports.signup =async (req, res, next) => {
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
}; 
module.exports.renderLogInForm = (req,res)=>{
    res.render('users/login.ejs'); 
}; 
module.exports.logIn= async (req, res) => {
    req.flash('success',"Welcome back — make yourself at home.");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
    
};
module.exports.logOut=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash('success',"Logged Out!!");
        res.redirect('/listings'); 
    }); 
};