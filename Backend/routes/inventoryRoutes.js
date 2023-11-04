const express=require('express')
const authMiddleWare=require('../middlewares/authMiddleWare')
const {createInventoryController, getInventoryController, getDonarController,getHospitalController, getOrganisationController} = require('../controllers/inventoryController')

const router=express.Router()

router.post('/create/create-inventory',authMiddleWare,createInventoryController)
router.get('/get-inventory',authMiddleWare,getInventoryController)

router.get('/get-donar',authMiddleWare,getDonarController)

router.get('/get-hospital',authMiddleWare,getHospitalController)
router.get('/get-organisation',authMiddleWare,getOrganisationController)

module.exports=router
