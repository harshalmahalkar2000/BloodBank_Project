const testController=(req,res)=>{
    res.status(200).send({
        message:"testing a route",
        success:true
    })
}

module.exports={testController}