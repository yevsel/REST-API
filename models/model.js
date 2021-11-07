const data = require('../data/product.json')
const {v4} = require('uuid')
const fs = require('fs')

function findAllData(){
    return new Promise((resolve,reject)=>{
        resolve(data)
    })
}

function findData(id){
    return new Promise((resolve,reject)=>{
        try{
            const result = data.filter(data=>data.id===id)
            resolve(result)
        }catch(error){
            reject("Error finding ID")
        }
    })
}

function createData(product){
    return new Promise((resolve,reject)=>{
        try{
            let newProduct={id:v4(),...product}
            data.push(newProduct)
            //WRITING TO THE FILE
            fs.writeFile("C:/Users/user/Desktop/REST API Practice/Second API/data/product.json",JSON.stringify(data),'utf-8',(err)=>{
                if (err){
                    console.log(err)
                }
            })
            resolve(newProduct)
        }catch(error){
            reject("There was an error in POST")
        }
    })
}

function getOldDataAndUpdate(reqBody){
    return new Promise((resolve,reject)=>{
        try{
            let result = data.filter(data=>data.id===reqBody.id)
            let indexOfresult = data.findIndex(p=>p.id===reqBody.id)
            
            result[0].id = reqBody.id
            result[0].name = reqBody.name || data[indexOfresult].name
            result[0].description = reqBody.description || data[indexOfresult].description
            result[0].price = reqBody.price || data[indexOfresult].price
            
            //Replacing the object at that index
            data[indexOfresult]=result[0]

            fs.writeFileSync("C:/Users/user/Desktop/REST API Practice/Second API/data/product.json",JSON.stringify(data),'utf-8',(err)=>{
                if(err){
                    console.log(err)
                }
            })

            resolve(result)
        }catch(error){
            reject("There was an Error getting the OLD data")
        }
        
    })
}

function findAndDelete(id){
    return new Promise((resolve,reject)=>{
        try {
            const restOfTheData = data.filter(data=>data.id!==id)
            fs.writeFileSync("C:/Users/user/Desktop/REST API Practice/Second API/data/product.json",JSON.stringify(restOfTheData),'utf-8',(err)=>{
                if(err){
                    console.log(err)
                }
            })
            resolve(restOfTheData)
        } catch (error) {
            reject("Unable to delete")
        }
    })
}

module.exports={
    findAllData,
    findData,
    createData,
    getOldDataAndUpdate,
    findAndDelete
}