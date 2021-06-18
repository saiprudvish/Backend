//create mini express app
const exp=require('express')
const productApi=exp.Router();





//sampleroute
productApi.get("/getproducts",(req,res)=>{
    res.send({message:"reply from productapi"})
})




















//export
module.exports=productApi;