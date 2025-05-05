const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const User = require('../models/user.js');
const passport = require('passport'); 
const {saveRedirectUrl} = require('../middleware.js'); 
const userController = require('../controllers/users.js')

router.route('/signup')
.get(userController.renderSignUpFrom)
.post(wrapAsync(userController.signup));

router.route('/login')
.get(userController.renderLogInForm)
.post(saveRedirectUrl
    ,passport.authenticate('local', { failureRedirect: '/login' , failureFlash: true}), userController.logIn);

router.get('/logout',userController.logOut);

module.exports = router; 