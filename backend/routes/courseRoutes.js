const express = require("express");
const {getCourses,getCourseById,createCourse,updateCourse,deleteCourse,addLessonToCourse} = require("../controllers/courseController");
const authentication = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/admin.middleware");

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourseById);
router.post("/", authentication, isAdmin, createCourse); // Only admins can create courses
router.put("/:id", authentication, isAdmin, updateCourse);
router.delete("/:id", authentication, isAdmin, deleteCourse);

// Add a lesson to an existing course
router.post("/:id/lessons", authentication, isAdmin, addLessonToCourse);

module.exports = router;

