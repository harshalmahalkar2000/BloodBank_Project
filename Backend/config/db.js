const mongoose=require("mongoose")

const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to mongoodb database ${mongoose.connection.host}`)
    }
    catch(error){
        console.log('Not Connected to atlas')
    }
} 

module.exports=connectDB