//import
const fs=require('fs')



//use it
//read file synchronously
// let fileData=fs.readFileSync('./data.txt')
// console.log("file data is " , fileData.toString())


// console.log('hellooo')


//read file asynchronously
function getData(){
fs.readFile('./data.txt',(err,data) =>{
    
    if(err){
        console.log('error is ',err.message)
    }
    else{
        console.log("file data is " , data.toString())
    }
})

console.log('hellooo')
console.log('good bye')

}


getData()
//writing data to a file---- >>this will ovverride existing data in file 
// function writeToFile(newData){
//     fs.writeFile('./data.txt',newData,(err) =>{
//         if(err){
//             console.log('error in writing file ',err)
//         }
//     })

// }
//writing data to a file
function writeToFile(newData){


    fs.appendFile('./data.txt',newData,(err) =>{


        if(err){
            console.log('error in writing file ',err.message)
        }
    })

}

writeToFile("hello mawa bro")