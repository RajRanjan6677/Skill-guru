const Progress = require("../models/progress.model");

const TEST_USER_ID = "690748301885779e2318a669";

// ✅ Get user progress
const getProgress = async (req, res) => {
  try {
    const userId = TEST_USER_ID;
    console.log("Fetching progress for:", userId);

    let progress = await Progress.findOne({ userId });

    if (!progress) {
      console.log("Creating new progress for test user...");
      progress = await Progress.create({
        userId,
        activeCourses: 3,
        hoursLearned: 12,
        completedLessons: 25,
        skillsGained: 6,
        learningData: [
          { day: "Mon", hours: 2 },
          { day: "Tue", hours: 3 },
          { day: "Wed", hours: 1 },
          { day: "Thu", hours: 4 },
          { day: "Fri", hours: 2 },
          { day: "Sat", hours: 3 },
          { day: "Sun", hours: 0 },
        ],
        skillData: [
          { name: "React", value: 40 },
          { name: "Node.js", value: 30 },
          { name: "JavaScript", value: 20 },
          { name: "CSS", value: 10 },
        ],
        activeDays: [
          { day: "Mon", active: true },
          { day: "Tue", active: true },
          { day: "Wed", active: false },
          { day: "Thu", active: true },
          { day: "Fri", active: true },
          { day: "Sat", active: false },
          { day: "Sun", active: false },
        ],
      });
    }

    res.json(progress);
  } catch (err) {
    console.error("Error fetching progress:", err);
    res.status(500).json({ message: "Error fetching progress", error: err.message });
  }
};

// ✅ Update progress manually (for testing)
const updateProgress = async (req, res) => {
  try {
    const userId = TEST_USER_ID;
    const updateData = req.body;

    const updated = await Progress.findOneAndUpdate({ userId }, updateData, {
      new: true,
      upsert: true, // creates one if not found
    });

    res.json(updated);
  } catch (err) {
    console.error("Error updating progress:", err);
    res.status(500).json({ message: "Error updating progress", error: err.message });
  }
};

module.exports = { getProgress, updateProgress };
