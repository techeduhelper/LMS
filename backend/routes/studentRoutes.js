import express from "express";
import passport from "passport";
import upload from "../utils/multer.js";
import {
  getAllStudents,
  getStudentByName,
  studentLogin,
  updatePassword,
  forgotPassword,
  getStudentByRegName,
  postOTP,
  postPrivateChat,
  getPrivateChat,
  differentChats,
  previousChats,
  updateProfile,
  getAllSubjects,
  getMarks,
  checkAttendance,
  getUnreadNotices,
} from "../controller/studentController.js";

const router = express.Router();

router.post("/login", studentLogin);

router.post("/forgotPassword", forgotPassword);

router.post("/postOTP", postOTP);

// UPLOAD PROFILE
router.post(
  "/updateProfile",
  passport.authenticate("jwt", { session: false }),
  upload.single("avatar"),
  updateProfile
);

// UPDATE PASSWORD
router.post(
  "/updatePassword",
  passport.authenticate("jwt", { session: false }),
  updatePassword
);

// CHAT RELATED ROUTES
router.get(
  "/chat/:roomId",
  passport.authenticate("jwt", { session: false }),
  getPrivateChat
);

router.post(
  "/chat/:roomId",
  passport.authenticate("jwt", { session: false }),
  postPrivateChat
);

router.get(
  "/chat/newerChats/:receiverName",
  passport.authenticate("jwt", { session: false }),
  differentChats
);

router.get(
  "/chat/previousChats/:senderName",
  passport.authenticate("jwt", { session: false }),
  previousChats
);

router.get(
  "/getMarks",
  passport.authenticate("jwt", { session: false }),
  getMarks
);

router.get(
  "/getAllSubjects",
  passport.authenticate("jwt", { session: false }),
  getAllSubjects
);

router.get(
  "/checkAttendance",
  passport.authenticate("jwt", { session: false }),
  checkAttendance
);

// HELPER ROUTES
router.post(
  "/getAllStudents",
  passport.authenticate("jwt", { session: false }),
  getAllStudents
);

router.post(
  "/getStudentByRegName",
  passport.authenticate("jwt", { session: false }),
  getStudentByRegName
);

router.post(
  "/getStudentByName",
  passport.authenticate("jwt", { session: false }),
  getStudentByName
);

router.get(
  "/unread",
  passport.authenticate("jwt", { session: false }),
  getUnreadNotices
);

export default router;
