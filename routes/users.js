var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
let { listing } = require("../models/transactionlist")
let {goalslist}=require("../models/goallist")
require('dotenv').config()

let uri = process.env.URI
// mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true });


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.post("/transactions", async (req, res) => {
  try{

    console.log(req.body,"body")
    await mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true });

    let transaction= await listing.create({
      text:req.body.text,
      amount:req.body.amount
      })
      
      await transaction.save()
      
     await res.status(200).json({
        "message":"entry sucess"
      })
      
  }
  catch(error){
   await res.status(500).json({error})
    console.log(error)
  }

await mongoose.disconnect();

})

router.post("/goals", async(req, res) => {

  try{

    await mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true });

    let goal= await goalslist.create({
     title:req.body.title,
      amount:req.body.amount,
      description:req.body.description
      })
      
      await goal.save()
      
     await res.status(200).json({
        "message":"entry sucess"
      })
      
  }
  catch(error){
   await res.status(500).json({error})
    console.log(error)
  }

await mongoose.disconnect();



})

router.get("/alltransactions", async (req, res) => {

  try {
    await mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true });

    let alldata = await listing.find()


    return res.status(200).json({
      count: alldata.length,
      data: alldata,
    })

  } catch (error) {
    res.status(500).json({ error })
    console.log(error);
  }

  await mongoose.disconnect();

})

router.get("/allgoals",async (req, res) => {

  try {
    await mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true });

    let allgoals = await goalslist.find();


    return res.status(200).json({
      count: allgoals.length,
      data: allgoals,
    })

  } catch (error) {
    res.status(500).json({ error })
    console.log(error);
  }

  await mongoose.disconnect();


})
router.delete("/delatransaction/:id",async (req, res) => {

  await mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true });

let data= await listing.findById(req.params.id)



if(data){
 await data.remove();
 await res.status(200).json({message:"transaction is delted"})
}
else if(!data){
  await res.status(404).json({message:"transaction not found"})
}

await mongoose.disconnect()

})
router.delete("/delagoal/:id", async (req, res) => {

  await mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true });

  let goals= await goalslist.findById(req.params.id)
  
  
  if(goals){
   await goals.remove();
   await res.status(200).json({message:"transaction is delted"})
  }
  else if(!goals){
    await res.status(404).json({message:"transaction not found"})
  }
  
  await mongoose.disconnect()


})

module.exports = router;
