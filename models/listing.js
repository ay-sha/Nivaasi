const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review.js');
const { types } = require('joi');

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        url: String,
        filename: String
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    categories: [{
        type: String,
        enum: ["mountains", "rooms", "iconiccities", "boats", "countryside", "arctic", "camping", "farms", "island", "amazingpools"],
        required: true
    }]
});

listingSchema.post('findOneAndDelete', async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }

});

listingSchema.pre('save', function (next) {
    if (this.country) {
        this.country = this.country.toLowerCase();
    }
    if (this.location) {
        this.location = this.location.toLowerCase();
    }
    next();
});

listingSchema.pre('insertMany', function (next, docs) {
    for (let doc of docs) {
        if (doc.country) {
            doc.country = doc.country.toLowerCase();
        }
        if (doc.location) {
            doc.location = doc.location.toLowerCase();
        }
    }
    next();
});



const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing; 