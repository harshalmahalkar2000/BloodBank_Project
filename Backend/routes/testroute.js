const express=require("express")
const { testController } = require("../controllers/testcontroll")


const router=express.Router()

router.get('/',testController)

module.exports=router
