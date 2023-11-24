import express from "express";
import passport from "passport";
import {
  addAdmin,
  getAllSubject,
  getAllStudents,
  adminLogin,
  getAllFaculty,
  getAllFaculties,
  addFaculty,
  addStudent,
  addSubject,
  getAllSubjects,
} from "../controller/adminController.js";

const router = express.Router();

router.post("/register", addAdmin);
router.post("/login", adminLogin);
router.post(
  "/addAdmin",
  passport.authenticate("jwt", { session: false }),
  addAdmin
);
router.post(
  "/getAllFaculty",
  passport.authenticate("jwt", { session: false }),
  getAllFaculty
);
router.post(
  "/getAllStudent",
  passport.authenticate("jwt", { session: false }),
  getAllStudents
);
router.post(
  "/getAllSubject",
  passport.authenticate("jwt", { session: false }),
  getAllSubject
);
router.post(
  "/addFaculty",
  passport.authenticate("jwt", { session: false }),
  addFaculty
);
router.get(
  "/getFaculties",
  passport.authenticate("jwt", { session: false }),
  getAllFaculties
);
router.post(
  "/addStudent",
  passport.authenticate("jwt", { session: false }),
  addStudent
);
router.post(
  "/addSubject",
  passport.authenticate("jwt", { session: false }),
  addSubject
);
router.get(
  "/getSubjects",
  passport.authenticate("jwt", { session: false }),
  getAllSubjects
);

export default router;
