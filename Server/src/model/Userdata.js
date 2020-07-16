const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://akhil:12345@products.pc3qm.mongodb.net/ProductDb?retryWrites=true&w=majority');
const Schema = mongoose.Schema

const userSchema = new Schema({
    username:String,
    phoneNo: Number,
    email:String,
    password:String
});

module.exports= mongoose.model('Userdata',userSchema,'users')