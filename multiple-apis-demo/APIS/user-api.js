//create mini express app
const exp = require('express')
const userApi = exp.Router();




//sampleroute
userApi.get("/getusers", (req,res) =>{
    res.send({message:"reply from userapi"})
})
















//export
module.exports = userApi;