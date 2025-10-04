const express = require('express')
const mongoose=require('mongoose')
const userRouter=require('./routes/user.routes')
const authentication=require('./middleware/auth.middleware')
const taskRouter=require('./routes/task.routes')
const cookieParser=require('cookie-parser')
const app = express()
const port = 3000

mongoose.connect('mongodb://127.0.0.1:27017/taskmanager')
.then(()=>console.log("mongodb connected"))
.catch((err)=>console.log("error ",err))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/auth',userRouter)
app.use('/task',authentication,taskRouter)
app.get('/',authentication,(req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
