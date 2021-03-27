const mongoose = require("mongoose")


let Transactions=new mongoose.Schema({

    text:{
    type:String,
 
    required:true
},
amount:{
    type:Number,
    
    required:true
    
},
createdAt :{
    type:Date,
    default:Date.now
    
}



})

let listing=mongoose.model("TransactionsCollection",Transactions)

module.exports ={listing}