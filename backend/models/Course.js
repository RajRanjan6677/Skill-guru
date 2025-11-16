const mongoose=require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
    rating: { type: Number, default: 0 },
    learners: { type: Number, default: 0 },
    progress: { type: Number, default: 0 },
    image: { type: String },
    lessons: [
      {
        title: String,
        duration: String,
        videoUrl: String,
      },
    ],
  },
  { timestamps: true }
);

// export default mongoose.model("Course", courseSchema);
const Course=mongoose.model('Course',courseSchema)
 module.exports=Course