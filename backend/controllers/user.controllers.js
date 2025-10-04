const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const salt='hhhhwu8whennvui847%^$jbi'
const User=require('../models/user.models')
const authentication = require('../middleware/auth.middleware')
const registerUser=async (req,res)=>{
  const {username,email,password}=req.body
  const userCheck=await user.findOne({email})
  if(user){
    res.json({message:"email already exists"})
  }
  const salt=await bcrypt.genSalt(10)
  const hashedPassword=await bcrypt.hash(password,salt)
  const user=new User({username,email,password:hashedPassword})
  await user.save()
  res.status(201).json({ message: 'User registered successfully' });
}
const login=async (req,res)=>{
  const {email,password}=req.body
  const user=await User.findOne({email})
  
  if(user){
  const varified=await bcrypt.compare(password,user.password)
  if(varified){
    const token=jwt.sign({email:user.email,id:user._id},salt)
    res.cookie('jwt',token)
    res.json({message:"login successful"})
  }
  else{
    res.json({message:"wrong password"})
  }
}
  else{
    res.json({message:"wrong credentials"})
  }
}
const logout=(req,res)=>{
  res.clearCookie('jwt')
  res.json({message:'logged out successfuly'})
}
const check=(req,res)=>{
  const token=req.cookies.jwt//mistske thi ke req.body lagdiya tha
      if(!token){
          res.json({authentication:false})
      }
      const decoded=jwt.verify(token,salt)
      //req.user=decoded req.body nahi sir data lost ho jae ga
    res.json({aithentication:true,user:decoded})
}
module.exports={
    registerUser,
    login,
    logout,
    check,
}