const { default: mongoose } = require('mongoose')
const userModel=require('../models/UserModels')
const inventoryModel=require('../models/inventoryModel')

const createInventoryController=async(req,res)=>{
    try{
        const {email}=req.body

        const user=await userModel.findOne({email})
        if(!user)
        {
            throw new Error('user not found')
        } 
        // if(inventoryType==='in' && user.role!=='donar'){
        //     throw new Error('Not a donor account')
        // }
        // if(inventoryType==='out' && user.role!=='hospital'){
        //     throw new Error('not a hospital')
        // }
        // if (req.body.inventoryType=="out"){
        //     const requestedBloodGroup=req.body.bloodGroup
        //     const requestedQuntityofBlood=req.body.quantity
        //     const organisation=new mongoose.Types.ObjectId(req.body.userId)
        //     //caluculate blood quantity
        //      const totalInRequesetedBlood=await inventoryModel.aggregate(
        //         [
        //             {$match:{
        //                 organisation,
        //                 inventoryType: 'in',
        //                 BloodGroup:requestedBloodGroup
        //             }},{
        //                 $group:{
        //                     _id:"$bloodGroup",
        //                     total:{$sum:'$quantity'}
        //                 }
        //             }
        //         ]
        //      )
        //      console.log("Total In",totalInRequesetedBlood)

        //     const totalIn=totalInRequesetedBlood[0]?.total||0



        //      const totalOutofRequestedBloodGroup= await inventoryModel.aggregate([
        //       {  $match:{
        //             organisation,
        //             inventoryType: 'out',
        //             bloodGroup:requestedBloodGroup,
        //         }},
        //         {
        //             $group:{
        //                 _id:"$bloodGroup",
        //                 total:{$sum :"$quantity"}
        //             }
        //         }
        //     ])

        //     const totalOut=totalOutofRequestedBloodGroup[0]?.total||0

        //     //out and in calculation
        //     const availableQuantityBloodGroup= totalIn-totalOut

        //     if(availableQuantityBloodGroup < requestedQuntityofBlood){
        //         return res.status(500).send({
        //             success:false,
        //             message:`Only ${availableQuantityBloodGroup} ML of ${requestedBloodGroup.toUpperCase()} is available`
        //         })
        //     }

        //     req.body.hospital=user?._id;
        // }

        if(req.body.inventoryType=='out'){
            const requestedBloodGroup=req.body.bloodGroup
            const requestedQuantityofBlood=req.body.quantity
            const  organisation=new mongoose.Types.ObjectId(req.body.userId)
            //caluculate bllod quantity
            const totalInRequestedBlood=await inventoryModel.aggregate(
            [
                {$match:{
                    organisation,
                    inventoryType:'in',
                    bloodGroup:requestedBloodGroup,
        
                },},{
                    $group:{
                        _id:"$bloodGroup",
                        total:{$sum :"$quantity"}
                    },
                }
            ]
            )
            console.log('Total In',totalInRequestedBlood)
            const totalIn=totalInRequestedBlood[0]?.total||0
        
            const totalOutOfRequestedBloodGroup= await inventoryModel.aggregate([
                {
                    $match:{
                        organisation,
                        inventoryType:'out',
                    bloodGroup:requestedBloodGroup,
        
        
        
                    }
                },{
               $group:{
                _id:"$bloodGroup",
                total:{$sum :'$quantity'}
               }
                }
            ])
            const totalOut=totalOutOfRequestedBloodGroup[0]?.total||0
        
            //out and in calc
            const avaiableQuantityBloodGroup=totalIn-totalOut
        
            if(avaiableQuantityBloodGroup < requestedQuantityofBlood){
                return res.status(500).send({
                    success:false,
                    message:`Only ${avaiableQuantityBloodGroup} ML of ${requestedBloodGroup.toUpperCase()} is available`      })
            }
            req.body.hospital=user?._id;
        }
        else{
            req.body.donar=user?._id
        }
    
        // Save Record
        const inventory= new inventoryModel(req.body)
        await inventory.save()
        return res.status(201).send({
            success:true,
            message:'New blood record added'
        })
    }
    catch(error){
        console.log (error)
        return res.status(500).send({
            success:false,
            message:'Error in create to inventory api'
        })
    }
}

const getInventoryController= async(req,res)=>{

    try{
        const inventory=await inventoryModel.find({organisation:req.body.userId})
        .populate("donar") // mongoose predefine function it will perticularly search given name
        .populate("hospital")
        .sort({creatAt:-1})
        return res.status(200).send({
            success:true,
            message:'get all inventory successfully',
            inventory
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error to get all inventory'
        })
    }

}

const getDonarController= async (req,res)=>{
    try{
        const organisation=req.body.userId;
        //find donars
        const donarId=await inventoryModel.distinct("donar",{
            organisation
        })

        const donars =await userModel.find({_id:{$in:donarId}})
        return res.status(200).send({
            success:true,
            message:"Donar Record Fetched Successfully",
            donars,
        })
        
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in donar record",
            error
        })
        
    }

}

const getHospitalController=async( req,res)=>{
    try{
        const organisation= req.body.userId
        const hospitalId=await inventoryModel.distinct('hospital',{organisation})

        const hospitals=await userModel.find({
            _id:{$in:hospitalId}
        })
        return res.status(200).send({
            success:true,
            message:'Hospital data fetched successfully',
            hospitals,
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in donar record'
        })
    }

}

const getOrganisationController= async ( req,res)=>{
    try{
        const donar=req.body.userId
        const orgId=await inventoryModel.distinct('organisation',{donar})
        //find organisation

        const organisation=await userModel.find({
            _id:{$in:orgId}
        })
        return res.status(200).send({
            success:true,
            message:'Org Data fetched successfully',
            organisation
        })
    }
    catch(error){
        console.log(error)
        return res.status(501).send({
            success:false,
            message:"error in ORG API",
            error
        })
    }

}

module.exports={createInventoryController,getInventoryController,getDonarController,getHospitalController,getOrganisationController}