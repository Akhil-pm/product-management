const express = require('express')
const bodyParser = require('body-parser')
const ProductData = require('./src/model/Productdata')
const UserData = require('./src/model/Userdata')
const cors= require('cors')
const jwt = require('jsonwebtoken')

var app = new express();


app.use(cors());
app.use(bodyParser.json())


app.get('/products',function(req,res){

    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS')
    ProductData.find()
             .then(function(products){
                 res.send(products)
             })
// res.send("success")
})


app.post('/insert',verifyToken,function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS')

    console.log("Post request recieved")

    // console.log(req.body)


    var product={
        productId:req.body.product.productId,
        productName:req.body.product.productName,
        productCode:req.body.product.productCode,
        releaseDate:req.body.product.releaseDate,
        description:req.body.product.description,
        price:req.body.product.price,
        starRating:req.body.product.starRating,
        imageUrl:req.body.product.imageUrl
    }
    console.log(product)
    var product= new ProductData(product);
    product.save((err,doc)=>{
        if(err){console.log("Error Occured")}
        else{res.status(200).send(doc)}
    })
           
})


app.delete('/delete/:id',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS')

    // console.log(req.params.id)
    ProductData.findByIdAndDelete(req.params.id,(err,doc)=>{
        if(!err){res.send(doc)}
        else{console.log("Error")}
    })

})


app.put('/edit',verifyToken,function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS')

    console.log(" server called ")

    console.log("id: "+req.body.product._id)


    const id= req.body.product._id

    var product={
        productId:req.body.product.productId,
        productName:req.body.product.productName,
        productCode:req.body.product.productCode,
        releaseDate:req.body.product.releaseDate,
        description:req.body.product.description,
        price:req.body.product.price,
        starRating:req.body.product.starRating,
        imageUrl:req.body.product.imageUrl
    }

    console.log(product)

    ProductData.findByIdAndUpdate(id,{ $set: product },(err,doc)=>{
        if(!err){res.send(doc)}
        else{console.log("Error")}
    });
  

})




app.post('/register',(req,res)=>{
    let userData =req.body;
    let user=new UserData(userData)
    user.save((err,registeredUser)=>{
        if(err){console.log(err)}
        else{
            let payload = {subject:registeredUser._id}
            let token = jwt.sign(payload,'secretKey')
            res.status(200).send({token})
        }
    })
})


app.post('/login',(req,res)=>{

    let email=req.body.loginData.email
    let password = req.body.loginData.password

    UserData.findOne({email:email},(err,user)=>{
          if(err){console.log(err)}
          else{
              if(!user)
              {
                return res.status(401).send('invalid email')
              }
              else{
                  if(user.password!=password){
                    res.status(401).send("invalid password")
                  }
                  else{
                    let payload = {subject:user._id}
                    let token = jwt.sign(payload,'secretKey')
                     res.status(200).send({token})
                  }
              }
          }

        })
    
})



function verifyToken(req,res,next)
{
 if(!req.headers.authorization)
 {
     return res.status(401).send('Unauthorized request')
 }
   let token = req.headers.authorization.split(' ')[1]
   if(token==='null')
   {
    return res.status(401).send('Unauthorized request')
   } 
      let payload=jwt.verify(token,'secretKey')
      if(!payload)
      {
        return res.status(401).send('Unauthorized request')
      }
         req.userId=payload.subject
         next()
}



const port = 3000;
app.listen(port,function(){

    console.log("Server port : "+port)
})















