const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate'); 
const MONGO_URL = "mongodb://127.0.0.1:27017/nivaasi";
const Listing = require("./models/listing.js")

app.set('view enginee','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method")); 
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public"))); 

main()
    .then((res) => {
        console.log('MongoDB Connected')
    }).catch((err) => {
        console.log(err);
    })
async function main() {
    await mongoose.connect(MONGO_URL);
}
app.get('/', (req, res) => {
    res.send('Root');
})
//Index
app.get('/listings', async (req,res)=>{
    const allListing = await Listing.find({});
    res.render('./listings/index.ejs',{allListing});
})

//New
app.get('/listings/new',(req,res)=>{
    res.render('./listings/new.ejs');
})

//Show
app.get('/listings/:id', async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render('./listings/show.ejs',{listing}); 
})
//Create
app.post('/listings',async(req,res)=>{
    let newListing = new Listing(req.body.listing);
    await newListing.save()
    res.redirect('/listings');
})
//edit
app.get('/listings/:id/edit', async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render('./listings/edit.ejs',{listing}); 
})
//update
app.put('/listings/:id',async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`)
})
//delete
app.delete('/listings/:id',async (req,res)=>{
    let {id} = req.params;
    let deltedListings = await Listing.findByIdAndDelete(id);
    console.log(deltedListings); 
    res.redirect('/listings');
})


app.listen(3000, () => {
    console.log('server is lisening to 3000');
})
