const Listing = require("../models/listing.js");
const { cloudinary } = require('../cloudConfig.js');


module.exports.index = async (req, res) => {
    const allListing = await Listing.find({});
    res.render('./listings/index.ejs', { allListing });
}; 

module.exports.renderNewForm = (req, res) => {
    console.log(req.user);
    res.render('./listings/new.ejs');
}; 

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({ path: 'reviews', populate: { path: 'author' } })
    .populate('owner');
    //console.log(currentUser);
    //console.log(listing.owner); 
    if (!listing) {
        req.flash('error', "Listing doesn't exist!");
        return res.redirect('/listings');
    }
    res.render('./listings/show.ejs', { listing });
}; 

module.exports.createListings = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const selectedItems = req.body.listing.categories; 
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    newListing.categories= selectedItems;
    console.log(newListing);
    await newListing.save();
    req.flash('success', 'New Listing Created!');
    res.redirect('/listings');

}; 
module.exports.renderEditFrom = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash('error', "Listing doesn't exist!");
        return res.redirect('/listings');
    }
    let originalImgUrl = listing.image.url;
    let changedUrl = originalImgUrl.replace('/upload','/upload/w_250') 
    res.render('./listings/edit.ejs', { listing, changedUrl });
}; 
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    //let listing = await Listing.findById(id);
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(typeof req.file !=='undefined'){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
    }
    req.flash('success', 'Listing Updated!');
    res.redirect(`/listings/${id}`);
}; 
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deltedListings = await Listing.findByIdAndDelete(id);
    if (deltedListings?.image?.filename) {
        await cloudinary.uploader.destroy(deltedListings.image.filename);
    }
    req.flash('success', 'Listing Deleted!');
    res.redirect('/listings');
}; 
module.exports.filteredListings = async(req,res)=>{
    let {category} = req.query; 
    const allListing = await Listing.find({categories: category});
    res.render('./listings/index.ejs',{allListing})
}