const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const salt='hhhhwu8whennvui847%^$jbi'
const User=require('../models/user.models')
const authentication = require('../middleware/auth.middleware')
const registerUser=async (req,res)=>{
  const {username,email,password,role}=req.body
  const userCheck=await User.findOne({email})
  if(userCheck){
    return res.json({message:"email already exists"})
  }
  const salt=await bcrypt.genSalt(10)
  const hashedPassword=await bcrypt.hash(password,salt)
  const user=new User({username,email,password:hashedPassword,role:role || 'user'})
  await user.save()
   res.status(201).json({ message: 'User registered successfully' });
  
}
const login=async (req,res)=>{
  const {email,password}=req.body
  const user=await User.findOne({email})
  
  if(user){
  const varified=await bcrypt.compare(password,user.password)
  if(varified){
    const token=jwt.sign({email:user.email,id:user._id,role:user.role},salt)
    res.cookie('jwt',token)
    res.json({message:"login successful",role:user.role,token:token})
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
// const check=(req,res)=>{
//   const token=req.cookies.jwt//mistske thi ke req.body lagdiya tha
//       if(!token){
//           res.json({authentication:false})
//       }
//       const decoded=jwt.verify(token,salt)
//       //req.user=decoded req.body nahi sir data lost ho jae ga
//     res.json({aithentication:true,user:decoded})
// }
const check = async (req, res) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ authentication: false, message: "No token found" });
    }

    const decoded = jwt.verify(token, salt);

    // Optional: fetch user details from DB
    const user = await User.findById(decoded.id).select("username email role");

    if (!user) {
      return res.status(404).json({ authentication: false, message: "User not found" });
    }

    res.status(200).json({
      authentication: true,
      user,
    });
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ authentication: false, message: "Invalid or expired token" });
  }
};
const getUser = async (req, res) => {
  
  try {

    const useremail=req.user.email
    
    const user = await User.findOne({email:useremail})
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user)                                                                                                                                                                   
    res.status(200).json(user); // directly send user info
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports={
    registerUser,
    login,
    logout,
    check,
    getUser
}