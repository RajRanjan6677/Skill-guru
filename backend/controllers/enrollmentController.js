const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const User = require("../models/user.models");

// Enroll a user in a course
const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      userId,
      courseId,
    });

    if (existingEnrollment) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    // Create enrollment
    const enrollment = new Enrollment({
      userId,
      courseId,
    });

    await enrollment.save();

    // Update course learners count
    course.learners = (course.learners || 0) + 1;
    await course.save();

    res.status(201).json({
      message: "Successfully enrolled in course",
      enrollment,
    });
  } catch (error) {
    console.error("Error enrolling in course:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all courses enrolled by a user
const getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const enrollments = await Enrollment.find({ userId }).populate("courseId");

    const courses = enrollments.map((enrollment) => ({
      ...enrollment.courseId.toObject(),
      enrolledAt: enrollment.enrolledAt,
      progress: enrollment.progress,
    }));

    res.json(courses);
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Check if user is enrolled in a specific course
const checkEnrollment = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const enrollment = await Enrollment.findOne({
      userId,
      courseId,
    });

    res.json({ enrolled: !!enrollment, enrollment });
  } catch (error) {
    console.error("Error checking enrollment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user's enrolled courses for profile
const getUserEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const enrollments = await Enrollment.find({ userId })
      .populate("courseId", "title _id")
      .select("courseId enrolledAt");

    const courses = enrollments.map((enrollment) => ({
      _id: enrollment.courseId._id,
      title: enrollment.courseId.title,
      enrolledAt: enrollment.enrolledAt,
    }));

    res.json(courses);
  } catch (error) {
    console.error("Error fetching user enrolled courses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  enrollInCourse,
  getEnrolledCourses,
  checkEnrollment,
  getUserEnrolledCourses,
};

