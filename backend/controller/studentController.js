import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import secretOrKey from "../config/key.js";
import sendEmail from "../utils/nodemailer.js";
import Student from "../models/student.js";
import Subject from "../models/subject.js";
import Attendence from "../models/attendence.js";
import Message from "../models/message.js";
import Mark from "../models/marks.js";

// File Handler
import bufferConversion from "../utils/bufferConversion.js";
import cloudinary from "../utils/cloudinary.js";

import validateStudentLoginInput from "../validation/studentLogin.js";
import validateStudentUpdatePassword from "../validation/studentUpdatePassword.js";
import validateForgotPassword from "../validation/forgotPassword.js";
import validateOTP from "../validation/otpValidation.js";
import Notice from "../models/Notice.js";

export const studentLogin = async (req, res, next) => {
  const { errors, isValid } = validateStudentLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { registrationNumber, password } = req.body;

  const student = await Student.findOne({ registrationNumber });
  if (!student) {
    errors.registrationNumber = "Registration number not found";
    return res.status(404).json(errors);
  }
  const isCorrect = await bcrypt.compare(password, student.password);
  if (!isCorrect) {
    errors.password = "Invalid Credentials";
    return res.status(404).json(errors);
  }
  const payload = { id: student.id, student };
  jwt.sign(payload, secretOrKey, { expiresIn: "2d" }, (err, token) => {
    res.json({
      success: true,
      message: "Login Successfully",
      token: "Bearer " + token,
      student,
    });
  });
};

export const checkAttendance = async (req, res, next) => {
  try {
    const studentId = req.user._id;
    const attendence = await Attendence.find({ student: studentId }).populate(
      "subject"
    );
    if (!attendence) {
      res.status(400).json({ message: "Attendence not found" });
    }
    res.status(200).json({
      result: attendence.map((att) => {
        let res = {};
        res.attendence = (
          (att.lectureAttended / att.totalLecturesByFaculty) *
          100
        ).toFixed(2);
        res.subjectCode = att.subject.subjectCode;
        res.subjectName = att.subject.subjectName;
        res.maxHours = att.subject.totalLectures;
        res.absentHours = att.totalLecturesByFaculty - att.lectureAttended;
        res.lectureAttended = att.lectureAttended;
        res.totalLecturesByFaculty = att.totalLecturesByFaculty;
        return res;
      }),
    });
  } catch (err) {
    console.log("Error in fetching attendence", err.message);
  }
};

export const getAllStudents = async (req, res, next) => {
  try {
    const { department, year, section } = req.body;
    const students = await Student.find({ department, year, section });
    if (students.length === 0) {
      return res.status(400).send({ message: "No student found" });
    }
    return res.status(200).send({ result: students });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

export const getStudentByName = async (req, res, next) => {
  try {
    const { name } = req.body;
    const students = await Student.find({
      name: { $regex: new RegExp(name, "i") },
    });

    if (students.length === 0) {
      return res.status(400).json({ message: "No student found" });
    }

    return res.status(200).json({ result: students });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const { errors, isValid } = validateStudentUpdatePassword(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { registrationNumber, oldPassword, newPassword, confirmNewPassword } =
      req.body;
    if (newPassword !== confirmNewPassword) {
      errors.confirmNewPassword = "Password Mismatch";
      return res.status(400).json(errors);
    }
    const student = await Student.findOne({ registrationNumber });
    const isCorrect = await bcrypt.compare(oldPassword, student.password);
    if (!isCorrect) {
      errors.oldPassword = "Invalid old Password";
      return res.status(404).json(errors);
    }
    let hashedPassword;
    hashedPassword = await bcrypt.hash(newPassword, 10);
    student.password = hashedPassword;
    await student.save();
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
    const student = await Student.findOne({ email });
    if (!student) {
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
    student.otp = OTP;
    await student.save();
    await sendEmail(student.email, OTP, "OTP");
    res.status(200).json({ message: "check your registered email for OTP" });
    const helper = async () => {
      student.otp = "";
      await student.save();
    };
    setTimeout(function () {
      helper();
    }, 300000);
  } catch (err) {
    console.log("Error in sending email", err.message);
  }
};

export const getStudentByRegName = async (req, res, next) => {
  try {
    const { registrationNumber } = req.body;
    const students = await Student.findOne({ registrationNumber });
    if (!students) {
      return res.status(400).json({ message: "No student found" });
    }
    return res.status(200).json({ result: students });
  } catch (err) {
    return res.status(400).json({ message: err.message });
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
    const student = await Student.findOne({ email });
    if (student.otp !== otp) {
      errors.otp = "Invalid OTP, check your email again";
      return res.status(400).json(errors);
    }
    let hashedPassword;
    hashedPassword = await bcrypt.hash(newPassword, 10);
    student.password = hashedPassword;
    await student.save();
    return res.status(200).json({ message: "Password Changed" });
  } catch (err) {
    console.log("Error in submitting otp", err.message);
    return res.status(200);
  }
};

export const postPrivateChat = async (req, res, next) => {
  try {
    const {
      senderName,
      senderId,
      roomId,
      receiverRegistrationNumber,
      senderRegistrationNumber,
      message,
    } = req.body;

    const receiverStudent = await Student.findOne({
      registrationNumber: receiverRegistrationNumber,
    });
    const newMessage = await new Message({
      senderName,
      senderId,
      roomId,
      message,
      senderRegistrationNumber,
      receiverRegistrationNumber,
      receiverName: receiverStudent.name,
      receiverId: receiverStudent._id,
      createdAt: new Date(),
    });
    await newMessage.save();
  } catch (err) {
    console.log("Error in post private chat", err.message);
  }
};

export const getPrivateChat = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const swap = (input, value_1, value_2) => {
      let temp = input[value_1];
      input[value_1] = input[value_2];
      input[value_2] = temp;
    };
    const allMessage = await Message.find({ roomId });
    let tempArr = roomId.split(".");
    swap(tempArr, 0, 1);
    let secondRomId = tempArr[0] + "." + tempArr[1];
    const allMessage2 = await Message.find({ roomId: secondRomId });
    var conversation = allMessage.concat(allMessage2);
    conversation.sort();
    res.status(200).json({ result: conversation });
  } catch (err) {
    console.log("errr in getting private chat server side", err.message);
  }
};

export const differentChats = async (req, res, next) => {
  try {
    const { receiverName } = req.params;
    const newChatsTemp = await Message.find({ receiverName });
    var filteredObjTemp = newChatsTemp.map((obj) => {
      let filteredObjTemp = {
        senderName: obj.senderName,
        receiverName: obj.receiverName,
        senderRegistrationNumber: obj.senderRegistrationNumber,
        receiverRegistrationNumber: obj.receiverRegistrationNumber,
        receiverId: obj.receiverId,
      };
      return filteredObjTemp;
    });
    let filteredListTemp = [
      ...new Set(filteredObjTemp.map(JSON.stringify)),
    ].map(JSON.parse);

    const newChats = await Message.find({ receiverName });
    var filteredObj = newChats.map((obj) => {
      let filteredObj = {
        senderName: obj.senderName,
        receiverName: obj.receiverName,
        senderRegistrationNumber: obj.senderRegistrationNumber,
        receiverRegistrationNumber: obj.receiverRegistrationNumber,
        receiverId: obj.receiverId,
      };
      return filteredObj;
    });
    let filteredListPro = [...new Set(filteredObj.map(JSON.stringify))].map(
      JSON.parse
    );
    for (var i = 0; i < filteredListPro.length; i++) {
      for (var j = 0; j < filteredListTemp.length; j++) {
        if (
          filteredListPro[i] &&
          filteredListTemp[j] &&
          filteredListPro[i].senderName === filteredListTemp[j].receiverName
        ) {
          filteredListPro.splice(i, 1);
        }
      }
    }
    res.status(200).json({ result: filteredListPro });
  } catch (err) {
    console.log("Error in getting different chats", err.message);
  }
};

export const previousChats = async (req, res, next) => {
  try {
    const { senderName } = req.params;
    const newChats = await Message.find({ senderName });
    var filteredObj = newChats.map((obj) => {
      let filteredObj = {
        senderName: obj.senderName,
        receiverName: obj.receiverName,
        senderRegistrationNumber: obj.senderRegistrationNumber,
        receiverRegistrationNumber: obj.receiverRegistrationNumber,
        receiverId: obj.receiverId,
      };
      return filteredObj;
    });
    var filteredList = [...new Set(filteredObj.map(JSON.stringify))].map(
      JSON.parse
    );
    console.log("filterdList", filteredList);
    res.status(200).json({ result: filteredList });
  } catch (err) {
    console.log("Error in getting previous chats", err.message);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const {
      email,
      gender,
      studentMobileNumber,
      fatherName,
      fatherMobileNumber,
      aadharCard,
    } = req.body;
    const userPostImg = await bufferConversion(
      req.file.originalname,
      req.file.buffer
    );
    const imgResponse = await cloudinary.uploader.upload(userPostImg);
    const student = await Student.findOne({ email });
    if (gender) {
      student.gender = gender;
      await student.save();
    }
    if (studentMobileNumber) {
      student.studentMobileNumber = studentMobileNumber;
      await student.save();
    }
    if (fatherName) {
      student.fatherName = fatherName;
      await student.save();
    }
    if (fatherMobileNumber) {
      student.fatherMobileNumber = fatherMobileNumber;
      await student.save();
    }
    if (aadharCard) {
      student.aadharCard = aadharCard;
      await student.save();
    }
    student.avatar = imgResponse.secure_url;
    await student.save();
    res.status(200).json(student);
  } catch (err) {
    console.log("Error in updating Profile", err.message);
  }
};

export const getAllSubjects = async (req, res, next) => {
  try {
    const { department, year } = req.user;
    const subjects = await Subject.find({ department, year });
    if (subjects.length === 0) {
      return res.status(404).json({ message: "No subjects founds" });
    }
    res.status(200).json({ result: subjects });
  } catch (err) {
    return res
      .status(400)
      .json({ "Error in getting all subjects": err.message });
  }
};

export const getMarks = async (req, res, next) => {
  try {
    const { department, year, id } = req.user;
    const getMarks = await Mark.find({ department, student: id }).populate(
      "subject"
    );

    const CA1 = getMarks.filter((obj) => {
      return obj.exam === "CA-I";
    });
    const CA2 = getMarks.filter((obj) => {
      return obj.exam === "CA-II";
    });
    const CA3 = getMarks.filter((obj) => {
      return obj.exam === "CA-III";
    });
    const CA4 = getMarks.filter((obj) => {
      return obj.exam === "CA-IV";
    });
    const Semester = getMarks.filter((obj) => {
      return obj.exam === "Semester";
    });
    res.status(200).json({
      result: {
        CA1,
        CA2,
        CA3,
        CA4,
        Semester,
      },
    });
  } catch (err) {
    return res.status(400).json({ "Error in getting marks": err.message });
  }
};

export const getUnreadNotices = async (req, res, next) => {
  try {
    const studentId = req.user._id;

    // Find unread notices for the student
    const unreadNotices = await Notice.find({
      isRead: false,
      recipients: studentId,
    });

    res.status(200).json({ unreadNotices });
  } catch (err) {
    console.error("Error getting unread notices:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
