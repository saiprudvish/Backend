//import
const exp= require("express")
//create express object
 const app= exp();

app.use(exp.json())

let users=[];

//GET
//http://localhost:3000/users
app.get('/users',(req,res)=>{
    if(users.length===0){
        res.send({message:'users list is empty'})
    }
    else{
        res.send({message:users})
    }
})

//http://localhost:3000/user/id
app.get("/user/:id", (req, res) => {

    let uid = (+req.params.id);

    //get user with that id
    let matchedUsers=users.filter(userObj=>userObj.id===uid)

    if(matchedUsers.length===0){
        res.send({message:`user with ${uid} is not existed`})
        console.log(matchedUsers)
    }

    else{
        res.send({message:matchedUsers[0]})
    }
})

//post
//create user
//http://localhost:3000/createuser
app.post('/createuser',(req,res)=>{


    let newUser=req.body;
    // search for user with id of new user
     let matchedUsers=users.filter(userObj=>userObj.id===newUser.id)

     if(matchedUsers.length===0){
        users=[...users,newUser]
        res.send({message:'user created'})
     }

     else{
         res.send({message: `User with id ${newUser.id} already existed`})
     }
    
    })

//updateuser
//http://localhost:3000/updateuser/<id>
app.put('/updateuser/:id',(req,res)=>{

    let userToUpdateObj=req.body;

    let ind=users.findIndex(userObj=>userObj.id===userToUpdateObj.id)
    if(ind===-1){
        res.send({message:'no user there to update'})
    }
    else{
        users.splice(ind,1,userToUpdateObj);
        res.send({message:'update success'})
    }

})

//remove
//http://localhost:3000/deleteuser/<id>
app.delete('/deleteuser/:id',(req,res)=>{
    let uid=(+ req.params.id)

    let ind=users.findIndex(userObj=>userObj.id===uid)
    if(ind===-1){
        res.send({message:'no user there to delete'})
    }
    else{
        users.splice(ind,1);
        res.send({message:'delete success'})
    }


})



//assign port number
const port=3000;
app.listen(port,() => console.log(`server listening on ${port}....`))