const mongoose=require('mongoose')
const {Schema}=mongoose
 const taskSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        default:false,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }
 })
 const Task=mongoose.model('Task',taskSchema)
 module.exports=Task