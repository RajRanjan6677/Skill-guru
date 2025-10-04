const express=require('express')
const router=express.Router()
const {registerUser,login,logout,check}=require('../controllers/user.controllers')
router.post('/register',registerUser)
router.post('/login',login)
router.post('/logout',logout)
router.get('/check',check)
module.exports=router