const {findAllData,findData,createData,getOldDataAndUpdate,findAndDelete} = require('../models/model')

//GETTING ALL DATA
async function getAllData(req,res){
    try{
        const result = await findAllData()
        res.writeHead(200,{"Content-Type":"application/json"})
        res.end(JSON.stringify(result))
    }catch(error){
        console.log("Cant find all Data")
    }
}

// GETTING DATA WITH SPECIFIC ID
async function getData(req,res,id){
    try{
        const result = await findData(id)
        if (result.length>0){
            res.writeHead(200,{"Content-Type":"application/json"})
            res.end(JSON.stringify(result))
        }
        else{
            res.writeHead(404,{"Content-Type":"application/json"})
            res.end(JSON.stringify({"message":"No user has this ID"}))
        }
    }catch(error){
        console.log("Specific Id unable to retrive")
    }
}

// POSTING DATA
async  function postData(req,res){
    try{
        let body=''
        //GETTING DATA FROM BODY OF REQUEST
        req.on('data',(chunk)=>{
            body+=chunk
        })
        req.on('end',async ()=>{
            let reqBody = JSON.parse(body)
            console.log(reqBody)

            let product={
                title:reqBody.title,
                disc:"Im in love with GOD almighty",
                price:reqBody.price
            }

            const result = await createData(product)
            res.writeHead(201,{"Content-Type":"application/json"})
            res.end(JSON.stringify(result))
        })

    }catch(error){
        console.log("Data unable to POST")
    }
}

// PUTTING DATA (Updating data)
async function updateData(req,res,id){
    try{
        let body=''
        req.on('data',(chunk)=>{
            body+=chunk.toString()
        })
        req.on('end',async ()=>{
            let reqBody = JSON.parse(body)
            // console.log(reqBody)
            let updData = await getOldDataAndUpdate(reqBody)

            if (updData.length>0){
                res.writeHead(200,{"Content-Type":"application/json"})
                res.end(JSON.stringify(updData))
            }
            else{
                res.writeHead(404,{"Content-Type":"application/json"})
                res.end(JSON.stringify({"message":"No user has this ID"}))
            }
        })
    }catch(error){
        console.log("There wasan Error")
    }
}

// DELETING DATA
async function deleteData(req,res,id){
    const result = await findAndDelete(id)
    res.writeHead(200,{"Content-Type":"application/json"})
    res.end(JSON.stringify(result))
}


module.exports={
    getAllData,
    getData,
    postData,
    updateData,
    deleteData
}