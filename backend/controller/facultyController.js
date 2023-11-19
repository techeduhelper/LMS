import validateAddNoticeInput from "../validation/addNotice.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/nodemailer.js";
import Student from "../models/student.js";
import Subject from "../models/subject.js";
import Faculty from "../models/faculty.js";
import Attendence from "../models/attendence.js";
import Mark from "../models/marks.js";
import Notice from "../models/Notice.js";
import keys from "../config/key.js";

// File Handler
import bufferConversion from "../utils/bufferConversion.js";
import cloudinary from "../utils/cloudinary.js";
import validateFacultyLoginInput from "../validation/facultyLogin.js";
import validateFetchStudentsInput from "../validation/facultyFetchStudent.js";
import validateFacultyUpdatePassword from "../validation/FacultyUpdatePassword.js";
import validateForgotPassword from "../validation/forgotPassword.js";
import validateOTP from "../validation/otpValidation.js";
import validateFacultyUploadMarks from "../validation/facultyUploadMarks.js";

export const facultyLogin = async (req, res, next) => {
  try {
    const { errors, isValid } = validateFacultyLoginInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { registrationNumber, password } = req.body;

    const faculty = await Faculty.findOne({ registrationNumber });
    if (!faculty) {
      errors.registrationNumber = "Registration number not found";
      return res.status(404).json(errors);
    }
    const isCorrect = await bcrypt.compare(password, faculty.password);
    if (!isCorrect) {
      errors.password = "Invalid Credentials";
      return res.status(404).json(errors);
    }
    const payload = {
      id: faculty.id,
      faculty,
    };
    jwt.sign(payload, keys, { expiresIn: "3d" }, (err, token) => {
      res.json({
        success: true,
        token: "Bearer " + token,
      });
    });
  } catch (err) {
    console.log("Error in faculty login", err.message);
  }
};

export const fetchStudents = async (req, res, next) => {
  try {
    const { errors, isValid } = validateFetchStudentsInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { department, year, section } = req.body;
    const subjectList = await Subject.find({ department, year });
    if (subjectList.length === 0) {
      errors.department = "No Subject found in the given department";
      return res.status(404).json(errors);
    }
    const students = await Student.find({ department, year, section });
    if (students.length === 0) {
      errors.department = "No Student found";
      return res.status(404).json(errors);
    }
    res.status(200).json({
      result: students.map((student) => ({
        _id: student._id,
        registrationNumber: student.registrationNumber,
        name: student.name,
      })),
      subjectCode: subjectList.map((sub) => sub.subjectCode),
    });
  } catch (err) {
    console.log("error in faculty fetchStudents", err.message);
  }
};

export const markAttendence = async (req, res, next) => {
  try {
    const { selectedStudents, subjectCode, department, year, section } =
      req.body;
    const sub = await Subject.findOne({ subjectCode });

    const allStudents = await Student.find({ department, year, section });

    const unselectedStudents = allStudents.filter((student) => {
      return !selectedStudents.includes(student._id.toString());
    });
    for (let i = 0; i < unselectedStudents.length; i++) {
      const pre = await Attendence.findOne({
        student: unselectedStudents[i]._id,
        subject: sub._id,
      });

      if (!pre) {
        const attendance = new Attendence({
          student: unselectedStudents[i]._id,
          subject: sub._id,
          totalLecturesByFaculty: 1,
        });
        await attendance.save();
      } else {
        pre.totalLecturesByFaculty += 1;
        await pre.save();
      }
    }

    for (let i = 0; i < selectedStudents.length; i++) {
      const pre = await Attendence.findOne({
        student: selectedStudents[i],
        subject: sub._id,
      });

      if (!pre) {
        const attendance = new Attendence({
          student: selectedStudents[i],
          subject: sub._id,
          totalLecturesByFaculty: 1,
          lectureAttended: 1,
        });
        await attendance.save();
      } else {
        pre.totalLecturesByFaculty += 1;
        pre.lectureAttended += 1;
        await pre.save();
      }
    }

    res.status(200).json({ message: "Attendance marked successfully" });
  } catch (err) {
    console.error("Error:", err.message);
    return res
      .status(400)
      .json({ message: `Error in marking attendance: ${err.message}` });
  }
};

export const uploadMarks = async (req, res, next) => {
  try {
    const { errors, isValid } = validateFacultyUploadMarks(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { subjectCode, exam, totalMarks, marks, department, year, section } =
      req.body;
    const subject = await Subject.findOne({ subjectCode });
    const isAlready = await Mark.find({
      exam,
      department,
      section,
      subjectCode: subject._id,
    });
    if (isAlready.length !== 0) {
      errors.exam = "You have already uploaded marks of the given exam";
      return res.status(400).json(errors);
    }
    for (var i = 0; i < marks.length; i++) {
      const newMarks = await new Mark({
        student: marks[i]._id,
        subject: subject._id,
        exam,
        department,
        section,
        marks: marks[i].value,
        totalMarks,
      });
      await newMarks.save();
    }
    res.status(200).json({ message: "Marks uploaded successfully" });
  } catch (err) {
    console.log("Error in uploading marks", err.message);
  }
};

export const getAllSubjects = async (req, res, next) => {
  try {
    const allSubjects = await Subject.find({});
    if (!allSubjects) {
      return res
        .status(404)
        .json({ message: "You haven't registered any subject yet." });
    }
    res.status(200).json({ allSubjects });
  } catch (err) {
    res
      .status(400)
      .json({ message: `error in getting all Subjects", ${err.message}` });
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const { errors, isValid } = validateFacultyUpdatePassword(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { registrationNumber, oldPassword, newPassword, confirmNewPassword } =
      req.body;
    if (newPassword !== confirmNewPassword) {
      errors.confirmNewPassword = "Password Mismatch";
      return res.status(404).json(errors);
    }
    const faculty = await Faculty.findOne({ registrationNumber });
    const isCorrect = await bcrypt.compare(oldPassword, faculty.password);
    if (!isCorrect) {
      errors.oldPassword = "Invalid old Password";
      return res.status(404).json(errors);
    }
    let hashedPassword;
    hashedPassword = await bcrypt.hash(newPassword, 10);
    faculty.password = hashedPassword;
    await faculty.save();
    res.status(200).json({ message: "Password Updated" });
  } catch (err) {
    console.log("Error in updating password", err.message);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { errors, isValid } = validateForgotPassword(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { email } = req.body;
    const faculty = await Faculty.findOne({ email });
    if (!faculty) {
      errors.email = "Email Not found, Provide registered email";
      return res.status(400).json(errors);
    }
    function generateOTP() {
      var digits = "0123456789";
      let OTP = "";
      for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }
      return OTP;
    }
    const OTP = await generateOTP();
    faculty.otp = OTP;
    await faculty.save();
    await sendEmail(faculty.email, OTP, "OTP");
    res.status(200).json({ message: "check your registered email for OTP" });
    const helper = async () => {
      faculty.otp = "";
      await faculty.save();
    };
    setTimeout(function () {
      helper();
    }, 300000);
  } catch (err) {
    console.log("Error in sending email", err.message);
  }
};

export const postOTP = async (req, res, next) => {
  try {
    const { errors, isValid } = validateOTP(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { email, otp, newPassword, confirmNewPassword } = req.body;
    if (newPassword !== confirmNewPassword) {
      errors.confirmNewPassword = "Password Mismatch";
      return res.status(400).json(errors);
    }
    const faculty = await Faculty.findOne({ email });
    if (faculty.otp !== otp) {
      errors.otp = "Invalid OTP, check your email again";
      return res.status(400).json(errors);
    }
    let hashedPassword;
    hashedPassword = await bcrypt.hash(newPassword, 10);
    faculty.password = hashedPassword;
    await faculty.save();
    return res.status(200).json({ message: "Password Changed" });
  } catch (err) {
    console.log("Error in submitting otp", err.message);
    return res.status(200);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { email, gender, facultyMobileNumber, aadharCard } = req.body;
    const userPostImg = await bufferConversion(
      req.file.originalname,
      req.file.buffer
    );
    const imgResponse = await cloudinary.uploader.upload(userPostImg);
    const faculty = await Faculty.findOne({ email });
    if (gender) {
      faculty.gender = gender;
      await faculty.save();
    }
    if (facultyMobileNumber) {
      faculty.facultyMobileNumber = facultyMobileNumber;
      await faculty.save();
    }
    if (aadharCard) {
      faculty.aadharCard = aadharCard;
      await faculty.save();
    }
    faculty.avatar = imgResponse.secure_url;
    await faculty.save();
    res.status(200).json(faculty);
  } catch (err) {
    console.log("Error in updating Profile", err.message);
  }
};

export const addNotice = async (req, res, next) => {
  try {
    const { errors, isValid } = validateAddNoticeInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { title, content, publisher, publisherName } = req.body;
    let result;
    const file = req.files ? req.files[0] : null;

    if (file) {
      try {
        result = await cloudinary.uploader.upload(file.path);
        console.log("Cloudinary upload result:", result);
      } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        return res
          .status(500)
          .json({ error: "Error uploading file to Cloudinary" });
      }
    }

    const newNotice = new Notice({
      title,
      content,
      publisher,
      publisherName,
      file: result ? result.secure_url : null,
    });

    await newNotice.save();
    res.status(201).json({ message: "Notice added successfully" });
  } catch (err) {
    console.error("Error adding notice:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getNotice = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });

    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
