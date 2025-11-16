const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    activeCourses: { type: Number, default: 0 },
    hoursLearned: { type: Number, default: 0 },
    completedLessons: { type: Number, default: 0 },
    skillsGained: { type: Number, default: 0 },
    learningData: [
      {
        day: String,
        hours: Number,
      },
    ],
    skillData: [
      {
        name: String,
        value: Number,
      },
    ],
    activeDays: [
      {
        day: String,
        active: Boolean,
      },
    ],
  },
  { timestamps: true }
);

const Progress = mongoose.model("Progress", progressSchema);
module.exports = Progress;
