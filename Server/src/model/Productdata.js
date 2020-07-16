const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://akhil:12345@products.pc3qm.mongodb.net/ProductDb?retryWrites=true&w=majority');
const Schema = mongoose.Schema

var NewProductsSchema = new Schema({

    productId : Number,
    productName : String,
    productCode : String,
    releaseDate : String,
    description : String,
    price : Number,
    starRating : Number,
    imageUrl : String
});

module.exports= mongoose.model('Productdata',NewProductsSchema,'products')