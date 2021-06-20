//create mini express app
const exp = require('express')
const userApi = exp.Router();

const expressErrorHandler = require("express-async-handler")
//body parsing middlleware
userApi.use(exp.json())

//import mongoclient
const mc=require("mongodb").MongoClient



//connection string
const databaseUrl="mongodb+srv://prudvish_database:Sai_7@database@cluster1.bxt0f.mongodb.net/prudvishdb1?retryWrites=true&w=majority"

let userCollectionObj;

//connect to DB
mc.connect(databaseUrl, {useNewUrlParser:true,  useUnifiedTopology: true}, (err, client) => {

    if (err) {
        console.log("err in db connection", err);
    }
    else {
        //get database object
        let databaseObj = client.db("prudvishdb1")
        //create collection object
       userCollectionObj= databaseObj.collection("usercollection")

        console.log("connected to database")

    }
})



//http://localhost:3000/user/getusers
//get users
userApi.get("/getusers", expressErrorHandler(async (req, res) => {

    let userList = await userCollectionObj.find().toArray()
    res.send({ message: userList })

}))


//get user by username
userApi.get("/getuser/:username", expressErrorHandler(async (req, res, next) => {

    //get username from url
    let un = req.params.username;
    //search
    let userObj = await userCollectionObj.findOne({ username: un })

    if (userObj === null) {
        res.send({ message: "User not existed" })
    }
    else {
        res.send({ message: userObj })
    }
}))

//http://localhost:3000/user/createuser
//create user
userApi.post("/createuser", expressErrorHandler(async (req, res, next) => {
    //get user obj
    let newUser = req.body;
    //search for existing user
    let user = await userCollectionObj.findOne({ username: newUser.username })
    //if user existed
    if (user !== null) {
        res.send({ message: "User already existed" })
    }
    else {
        // //hash password
        // let hashedPassword = await bcryptjs.hash(newUser.password, 7)
        // //replace password
        // newUser.password = hashedPassword;
        // //insert
        await userCollectionObj.insertOne(newUser)
        res.send({ message: "User created" })
    }
}))

//http://localhost:3000/user/updateuser/<username>

userApi.put("/updateuser/:username", expressErrorHandler(async (req, res, next) => {

    //get modified user
    let modifiedUser = req.body;
    //update
    await userCollectionObj.updateOne({ username: modifiedUser.username }, { $set: { ...modifiedUser } })
    //send res
    res.send({ message: "User modified" })

}))


//delete user
userApi.delete("/deleteuser/:username", expressErrorHandler(async (req, res) => {

    //get username from url
    let un = req.params.username;
    //find the user
    let user = await userCollectionObj.findOne({ username: un })

    if (user === null) {
        res.send({ message: "User not existed" })
    }
    else {
        await userCollectionObj.deleteOne({ username: un })
        res.send({ message: "user removed" })
    }
}))












//export
module.exports = userApi;