import express from "express";
import passport from "passport";
import upload from "../utils/multer.js";

const router = express.Router();

import {
  fetchStudents,
  facultyLogin,
  getAllSubjects,
  updatePassword,
  forgotPassword,
  postOTP,
  uploadMarks,
  updateProfile,
  markAttendence,
  addNotice,
  getNotice,
} from "../controller/facultyController.js";

// LOGIN || POST METHOD
router.post("/login", facultyLogin);

// FORGOTPASSWORD || POST METHOD
router.post("/forgotPassword", forgotPassword);

router.post("/postOTP", postOTP);

router.post(
  "/updateProfile",
  passport.authenticate("jwt", { session: false }),
  upload.single("avatar"),
  updateProfile
);

router.post(
  "/addNotice",
  passport.authenticate("jwt", { session: false }),
  upload.single("file"),
  addNotice
);

router.post(
  "/fetchStudents",
  passport.authenticate("jwt", { session: false }),
  fetchStudents
);

router.post(
  "/fetchAllSubjects",
  passport.authenticate("jwt", { session: false }),
  getAllSubjects
);

router.post(
  "/markAttendance",
  passport.authenticate("jwt", { session: false }),
  markAttendence
);

router.post(
  "/uploadMarks",
  passport.authenticate("jwt", { session: false }),
  uploadMarks
);

router.post(
  "/updatePassword",
  passport.authenticate("jwt", { session: false }),
  updatePassword
);

router.get("/getNotice", getNotice);

export default router;
