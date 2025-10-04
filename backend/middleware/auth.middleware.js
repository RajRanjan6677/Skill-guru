const jwt=require('jsonwebtoken')
const salt='hhhhwu8whennvui847%^$jbi'
const authentication=(req,res,next)=>{
    const token=req.cookies.jwt//mistske thi ke req.body lagdiya tha
    if(!token){
        res.json({message:'unauthorized:please log in'})
    }
    const decoded=jwt.verify(token,salt)
    req.user=decoded//req.body nahi sir data lost ho jae ga
    next()
}
module.exports=authentication