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
// const updateTask=async (req,res)=>{
//     const userId=req.user.id
//     const {title,description}=req.body
//     const {taskId}=req.params
//     const task=await Task.findOneAndUpdate({_id:taskId,userId},{title,description},{new:true})
//     if(!task) return res.status(404).json({message:'task not found or unauthorized'})
//     res.status(200).json({message:'task updated',task})
// }
const updateTask = async (req, res) => {
  const userId = req.user.id;
  const { title, description, status } = req.body;
  const { taskId } = req.params;

  try {
    // Build update fields dynamically
    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (status !== undefined) updateFields.status = status; // ✅ handle status toggle

    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId },
      updateFields,
      { new: true }
    );

    if (!task)
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });

    res.status(200).json({ message: "Task updated", task });
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: "Server error updating task" });
  }
};

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