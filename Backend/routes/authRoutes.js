const express=require('express')
const {registerController,loginController,currentuserController}=require('../controllers/authController')
const authMiddleWare = require('../middlewares/authMiddleWare')
const router=express.Router()


router.post('/register',registerController)

router.post('/login', loginController)

router.get('/current-user',authMiddleWare,currentuserController)
module.exports=router