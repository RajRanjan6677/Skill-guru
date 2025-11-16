// const Course=require("../models/Course");

// // Get all courses
// const getCourses = async (req, res) => {
//   try {
//     const courses = await Course.find();
//     res.json(courses);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Get single course by ID
// const getCourseById = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
//     if (!course) return res.status(404).json({ message: "Course not found" });
//     res.json(course);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Add new course
// const createCourse = async (req, res) => {
//   try {
//     const course = new Course(req.body);
//     await course.save();
//     res.status(201).json(course);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Update a course
// const updateCourse = async (req, res) => {
//   try {
//     const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete a course
// const deleteCourse = async (req, res) => {
//   try {
//     await Course.findByIdAndDelete(req.params.id);
//     res.json({ message: "Course deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
// module.exports={
//     getCourses,
//     getCourseById,
//     createCourse,
//     updateCourse,
//     deleteCourse,
// }
const Course = require("../models/Course");

// 🟢 Get all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error("❌ Error fetching courses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟢 Get single course by ID (with lessons)
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (error) {
    console.error("❌ Error fetching course:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟢 Create a new course (with lessons)
const createCourse = async (req, res) => {
  try {
    const { title, author, description, level, image, lessons } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: "Title and Author are required" });
    }

    // Ensure lessons is an array if provided
    const formattedLessons = Array.isArray(lessons)
      ? lessons.map((lesson) => ({
          title: lesson.title || "Untitled Lesson",
          duration: lesson.duration || "N/A",
          videoUrl: lesson.videoUrl || "",
        }))
      : [];

    const newCourse = new Course({
      title,
      author,
      description,
      level,
      image,
      lessons: formattedLessons,
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    console.error("❌ Error creating course:", error);
    res.status(400).json({ message: error.message });
  }
};

// 🟡 Update a course or its lessons
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedCourse)
      return res.status(404).json({ message: "Course not found" });

    res.json(updatedCourse);
  } catch (error) {
    console.error("❌ Error updating course:", error);
    res.status(400).json({ message: error.message });
  }
};

// 🔴 Delete a course
const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted" });
  } catch (error) {
    console.error("❌ Error deleting course:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟢 Add a new lesson to an existing course
const addLessonToCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, duration, videoUrl } = req.body;

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.lessons.push({
      title: title || "Untitled Lesson",
      duration: duration || "N/A",
      videoUrl: videoUrl || "",
    });

    await course.save();
    res.json(course);
  } catch (error) {
    console.error("❌ Error adding lesson:", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  addLessonToCourse,
};
