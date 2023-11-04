const express= require("express")
const app=express()
const dotenv=require("dotenv")
const colors=require("colors")
const morgan=require("morgan")
const cors=require("cors")
const connectDB = require("./config/db")

// app.get("/",  (req,res)=>{
//     res.status(200).json(
//         {
//             message:"Welcome to Blood bank web application"
//         }
//     )
// })

dotenv.config()
connectDB()

//middlewares

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))




app.use("/", require("./routes/testroute"))
app.use('/api/v1/auth',require('./routes/authRoutes'))
app.use('/api/v1/inventory',require('./routes/inventoryRoutes'))

const PORT=process.env.PORT || 8000 

app.listen(PORT,()=>{
    console.log(`Welcome to node server ${process.env.DEV_MODE} ${process.env.PORT}`)
})