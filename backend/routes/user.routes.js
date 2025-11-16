const express=require('express')
const router=express.Router()
const {registerUser,login,logout,check,getUser}=require('../controllers/user.controllers')
const authentication=require('../middleware/auth.middleware')
router.post('/register',registerUser)
router.post('/login',login)
router.post('/logout',logout)
//router.get('/profile',check)
router.get("/profile",authentication,getUser);
module.exports=router