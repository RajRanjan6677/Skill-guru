const express=require('express')
const router=express.Router()
const {createTask,getTask,updateTask,deleteTask}=require('../controllers/task.controllers')

router.post('/create',createTask)
router.get('/read',getTask)
router.put('/update/:taskId',updateTask)
router.delete('/delete/:taskId',deleteTask)

module.exports=router