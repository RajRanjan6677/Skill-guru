const express = require("express");
const router = express.Router();
const authentication = require("../middleware/auth.middleware");
const {
  enrollInCourse,
  getEnrolledCourses,
  checkEnrollment,
  getUserEnrolledCourses,
} = require("../controllers/enrollmentController");

// All routes require authentication
router.post("/:courseId", authentication, enrollInCourse);
router.get("/", authentication, getEnrolledCourses);
router.get("/check/:courseId", authentication, checkEnrollment);
router.get("/user/courses", authentication, getUserEnrolledCourses);

module.exports = router;

