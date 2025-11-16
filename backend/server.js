const express = require('express')
const mongoose=require('mongoose')
const userRouter=require('./routes/user.routes')
const authentication=require('./middleware/auth.middleware')
const taskRouter=require('./routes/task.routes')
const progressRouter=require('./routes/progress.routes.js')

const courseRoutes=require("./routes/courseRoutes.js");

const cookieParser=require('cookie-parser')
const app = express()
const port = 3000
const cors=require('cors')
mongoose.connect('mongodb://127.0.0.1:27017/taskmanager')
.then(()=>console.log("mongodb connected"))
.catch((err)=>console.log("error ",err))
//app.use(cors())
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if using cookies or sessions
  })
);

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/auth',userRouter)
app.use('/task',authentication,taskRouter)
app.use('/courses',courseRoutes)
app.use("/progress", authentication, progressRouter);
app.use("/enrollments", require("./routes/enrollmentRoutes"));

app.get('/',authentication,(req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
