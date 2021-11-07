const fs = require('fs')

function writeDataToJSON(filename,data){
    fs.writeFile(filename,JSON.stringify(data),'utf-8',(err)=>{
        if(err){
            console.log(err)
        }
    })
}

module.exports={
    writeDataToJSON
}