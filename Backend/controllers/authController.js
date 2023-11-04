const userModel=require('../models/UserModels')
const bcrypt=require('bcrypt')
const jwt= require('jsonwebtoken')


const registerController= async (req,res)=>{
    try{
        const exisitingUser=await userModel.findOne({email:req.body.email})
        //Validation
        if(exisitingUser){
            return res.status(200).send({
                success:false,
                message:"User Already Exist"
            })
        }
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(req.body.password,salt)
        req.body.password=hashedPassword

        //rest Data

        const user=new userModel(req.body)
        await user.save()
        return  res.status(201).send({
            success:true,
            message:"User registered successfully",
            user
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Register API',
            error

        })
      
    }

}

const loginController= async (req,res)=>{
    try{
        const user=await userModel.findOne({email:req.body.email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Aunthincation failed'
            })
        }

        //check role
        if(user.role!=req.body.role){
            return res.status(500).send({
                success:false,
                message:'user data does not match'
            })
        }

        const comparePassword=await bcrypt.compare(req.body.password, user.password)

        if(!comparePassword){
            return res.status(500).send({
                success:false,
                message:'Aunthincation failed'
            
            })
        }

        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})

        return res.status(200).send({
            success:true,
            message:'Login Successfully',
            token,
            user
        })

    }
    catch(error){
        console.log(error)
        res.send(500).send({
            success:false,
            message:'Erroe to login API',
            error
        })

    }
}

const currentuserController= async(req,res)=>{
    try{
        const user= await userModel.findOne({
            _id:req.body.userId
        })
        return res.status(200).send({
            success:true,
            message:'user fetched successfully',
            user
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success:true,
            message:'unable to get currenr user',
            error
        })
    }

    
}

module.exports={registerController,loginController,currentuserController} 