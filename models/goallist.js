const mongoose = require("mongoose")


let goals=new mongoose.Schema({

title:{
    type:String,
    trim:true,
    required:[true,"Enter text"]
    
},
amount:{
    type:Number,
    
    required:[true,"Enter the number"]
    
},
description:{
    type:String,
   
    required:[true,"Enter text"]
    
},
createdAt :{
    type:Date,
    default:Date.now
    
}



})

let goalslist=mongoose.model("goalscollection",goals)

module.exports ={goalslist}