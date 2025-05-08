const express = require('express');
const router = express.Router({ mergeParams: true });
const multer = require('multer');
const { storage } = require('../cloudConfig.js')
const upload = multer({ storage });
const wrapAsync = require('../utils/wrapAsync.js');
const Listing = require("../models/listing.js");
const Review = require('../models/review.js');
const { isLoggedIn, isOwner, validateListing, validCategories } = require('../middleware.js');
const listingController = require('../controllers/listings.js')


router.route('/')
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, validateListing, upload.single('listing[image]'), wrapAsync(listingController.createListings));

//New
router.get('/new', isLoggedIn, listingController.renderNewForm);
router.get('/categories', validCategories, wrapAsync(listingController.filteredListings))
router.get('/search', wrapAsync(listingController.searchListing));

router.route('/:id')
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Edit
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingController.renderEditFrom));


module.exports = router; 