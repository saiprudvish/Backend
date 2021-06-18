const http=require("http")


//create server

const server=http.createServer((req,res)=>{


    // // console.log(req.method)

    // // res.end('response from server')

    // // GET request handler
    // if(req.method=="GET"){
    //     res.end('Reply for get request')
    // }
    //   // POST request handler
    //   if(req.method=="PUT"){
    //     res.end('Reply for put request')
    // }
    //   // PUT request handler
    //   if(req.method=="POST"){
    //     res.end('Reply for post request')
    // }
    //   // DELETE request handler
    //   if(req.method=="DELETE"){
    //     res.end('Reply for delete request')
    // }
  

    //get request handlers
    if(req.method=="GET"){
        if(req.url==="/getusers"){
              res.end('this is usersdata')
        }
        if(req.url==="/getproducts"){
            res.end("this is productsdata")
        }
    }


     //postt request handlers
     if(req.method=="POST"){
        if(req.url=="/createusers"){
              res.end('users created')
        }
        if(req.url=="/createproducts"){
            res.end("product created")
        }
    }



});

//asign port number
server.listen(2000,()=>console.log("server listening on 2000..."))
