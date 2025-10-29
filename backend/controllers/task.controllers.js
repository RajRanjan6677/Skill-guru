const Task=require('../models/task.models')
// const getTask=async (req,res)=>{
//     const userId=req.user.id
//     const task=await Task.find({userId})
//     res.json(task)
// }
const getTask = async (req, res) => {
  const userId = req.user.id;
  const task = await Task.find({ userId });
  //console.log("Fetched tasks:", task);  ✅ see if this logs tasks
  res.json(task);
};

const createTask=async (req,res)=>{
    const userId=req.user.id
    const {title,description}=req.body
    const task=new Task({title,description,status:false,userId})
    await task.save()
    res.json({message:"task created"})
}
const updateTask=async (req,res)=>{
    const userId=req.user.id
    const {title,description}=req.body
    const {taskId}=req.params
    const task=await Task.findOneAndUpdate({_id:taskId,userId},{title,description},{new:true})
    if(!task) return res.status(404).json({message:'task not found or unauthorized'})
    res.status(200).json({message:'task updated',task})
}
const deleteTask=async (req,res)=>{
    const userId=req.user.id
    const {taskId}=req.params
    const task=await Task.findOneAndDelete({_id:taskId,userId})
    if(task)
    return res.status(200).json({message:"task deleted successfuly"})
    else
    return res.status(404).json({message:"task not found or unauthorized"})
}
module.exports={
    createTask,
    getTask,
    updateTask,
    deleteTask,
}