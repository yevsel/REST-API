const console = require('console')
const http = require('http')
const {getAllData,getData,postData,updateData,deleteData} = require('./controllers/controller')

const server = http.createServer((req,res)=>{
    // GET ALL DATA
    if (req.url==='/api/products' && req.method==='GET'){
        getAllData(req,res)
    }

    //GET ON DATA with a specified ID
    else if(req.url.match(/\/api\/products\/[0-9]+/) && req.method==='GET'){
        const id = req.url.split('/')[3]
        getData(req,res,id)
    }

    //POST DATA to request body
    else if(req.url==='/api/products' && req.method==='POST'){
        postData(req,res)
    }

    //PUT (editing existing data)
    else if(req.url.match(/\/api\/products\//) && req.method==='PUT'){
        // const id = req.url.split('/')[3]
        updateData(req,res)
    }

    // DELETING DATA
    else if(req.url.match(/\/api\/products\/[0-9]+/) && req.method==='DELETE'){
        const id = req.url.split('/')[3]
        deleteData(req,res,id)
    }


    else{
        res.writeHead(404,{"Content-Type":"application/json"})
        res.end(JSON.stringify({"message":"Unknown Route"}))
    }

})

server.listen(3000,()=>{
    console.log('Listening on PORT 3000...')
})