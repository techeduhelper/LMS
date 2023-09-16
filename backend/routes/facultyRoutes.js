import express from 'express';
import passport from 'passport';
import upload from '../utils/multer.js';

const router = express.Router();

import {
    fetchStudents,
    facultyLogin,
    getAllSubjects,
    updatePassword,
    forgotPassword,
    postOTP,
    uploadMarks,
    updateProfile
} from '../controller/facultyController.js';

router.post('/login', facultyLogin);

router.post('/forgotPassword', forgotPassword);

router.post('/postOTP', postOTP);

router.post('/updateProfile', passport.authenticate('jwt', { session: false }), upload.single('avatar'), updateProfile);

router.post('/fetchStudents', passport.authenticate('jwt', { session: false }), fetchStudents);

router.post('/fetchAllSubjects', passport.authenticate('jwt', { session: false }), getAllSubjects);

// router.post('/markAttendance', passport.authenticate('jwt', { session: false }), markAttendance);

router.post('/uploadMarks', passport.authenticate('jwt', { session: false }), uploadMarks);

router.post('/updatePassword', passport.authenticate('jwt', { session: false }), updatePassword);

export default router;
