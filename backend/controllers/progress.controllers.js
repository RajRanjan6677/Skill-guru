// const Progress = require("../models/progress.model");

// const TEST_USER_ID = "690748301885779e2318a669";

// // ✅ Get user progress
// const getProgress = async (req, res) => {
//   try {
//     const userId = TEST_USER_ID;
//     console.log("Fetching progress for:", userId);

//     let progress = await Progress.findOne({ userId });

//     if (!progress) {
//       console.log("Creating new progress for test user...");
//       progress = await Progress.create({
//         userId,
//         activeCourses: 0,
//         hoursLearned: 0,
//         completedLessons: 0,
//         skillsGained: 0,
//         learningData: [
          
//         ],
//         skillData: [
//           { name: "React", value: 40 },
//           { name: "Node.js", value: 30 },
//           { name: "JavaScript", value: 20 },
//           { name: "CSS", value: 10 },
//         ],
//         activeDays: [
          
//         ],
//       });
//     }

//     res.json(progress);
//   } catch (err) {
//     console.error("Error fetching progress:", err);
//     res.status(500).json({ message: "Error fetching progress", error: err.message });
//   }
// };

// // ✅ Update progress manually (for testing)
// const updateProgress = async (req, res) => {
//   try {
//     const userId = TEST_USER_ID;
//     const updateData = req.body;

//     const updated = await Progress.findOneAndUpdate({ userId }, updateData, {
//       new: true,
//       upsert: true, // creates one if not found
//     });

//     res.json(updated);
//   } catch (err) {
//     console.error("Error updating progress:", err);
//     res.status(500).json({ message: "Error updating progress", error: err.message });
//   }
// };

// // const updateProgress = async (req, res) => {
// //   try {
// //     const userId = TEST_USER_ID;

// //     const {
// //       activeCourses,
// //       hoursLearned,
// //       completedLessons,
// //       skillsGained,
// //       learningData,
// //       skillData,
// //       activeDays,
// //     } = req.body;

// //     const updated = await Progress.findOneAndUpdate(
// //       { userId },
// //       {
// //         $set: {
// //           activeCourses,
// //           hoursLearned,
// //           completedLessons,
// //           skillsGained,
// //           learningData,
// //           skillData,
// //           activeDays,
// //         },
// //       },
// //       {
// //         new: true,
// //         upsert: true,
// //         runValidators: true,
// //       }
// //     );

// //     res.json(updated);
// //   } catch (err) {
// //     console.error("Error updating progress:", err);
// //     res
// //       .status(500)
// //       .json({ message: "Error updating progress", error: err.message });
// //   }
// // };


// module.exports = { getProgress, updateProgress };
const Progress = require("../models/progress.model");

// ✅ Get user progress
const getProgress = async (req, res) => {
  try {
    const userId = req.user.id; // 🔥 REAL USER ID

    let progress = await Progress.findOne({ userId });

    // ✅ Create progress doc ONLY if not exists
    if (!progress) {
      progress = await Progress.create({
        userId,
        activeCourses: 0,
        hoursLearned: 0,
        completedLessons: 0,
        skillsGained: 0,
        learningData: [],
        skillData: [
          { name: "React", value: 0 },
          { name: "Node.js", value: 0 },
          { name: "JavaScript", value: 0 },
          { name: "CSS", value: 0 },
        ],
        activeDays: [],
      });
    }

    res.json(progress);
  } catch (err) {
    console.error("Error fetching progress:", err);
    res.status(500).json({
      message: "Error fetching progress",
      error: err.message,
    });
  }
};

// ✅ Update progress (SAFE for nested arrays)
const updateProgress = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      activeCourses,
      hoursLearned,
      completedLessons,
      skillsGained,
      learningData,
      skillData,
      activeDays,
    } = req.body;

    const updated = await Progress.findOneAndUpdate(
      { userId },
      {
        $set: {
          activeCourses,
          hoursLearned,
          completedLessons,
          skillsGained,
          learningData,
          skillData,
          activeDays,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.json(updated);
  } catch (err) {
    console.error("Error updating progress:", err);
    res.status(500).json({
      message: "Error updating progress",
      error: err.message,
    });
  }
};

module.exports = { getProgress, updateProgress };
