// adminController.mjs
import bcrypt from "bcrypt";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";

// Validation
import validateAdminRegisterInput from "../validation/adminRegister.js";
import validateFacultyRegisterInput from "../validation/facultyRegister.js";
import validateStudentRegisterInput from "../validation/studentRegister.js";
import validateAdminLoginInput from "../validation/adminLogin.js";
import validateSubjectRegisterInput from "../validation/subjectRegister.js";

// Models
import Subject from "../models/subject.js";
import Student from "../models/student.js";
import Faculty from "../models/faculty.js";
import Admin from "../models/admin.js";

// Config
import secretOrKey from "../config/key.js";

export const addAdmin = async (req, res, next) => {
  try {
    const { name, email, dob, department, contactNumber } = req.body;

    // VALIDATE REQUEST BODY
    if (!name || !email || !dob || !department || !contactNumber) {
      return res.status(400).json({
        success: false,
        message: "Probably you have missed certain fields",
      });
    }

    const admin = await Admin.findOne({ email });
    if (admin) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
    let departmentHelper;

    if (department === "C.S.E") {
      departmentHelper = "01";
    } else if (department === "E.C.E") {
      departmentHelper = "02";
    } else if (department === "I.T") {
      departmentHelper = "03";
    } else if (department === "Mechanical") {
      departmentHelper = "04";
    } else if (department === "Civil") {
      departmentHelper = "05";
    } else if (department === "E.E.E") {
      departmentHelper = "06";
    } else {
      departmentHelper = "00";
    }

    const admins = await Admin.find({ department });
    let helper;

    if (admins.length < 10) {
      helper = "00" + admins.length.toString();
    } else if (admins.length < 100 && admins.length > 9) {
      helper = "0" + admins.length.toString();
    } else {
      helper = admins.length.toString();
    }

    let hashedPassword;
    hashedPassword = await bcrypt.hash(dob, 10);

    const date = new Date();
    const joiningYear = date.getFullYear();
    const components = ["SECAM", joiningYear, departmentHelper, helper];

    const registrationNumber = components.join("");

    const newAdmin = await new Admin({
      name,
      email,
      password: hashedPassword,
      joiningYear,
      registrationNumber,
      department,
      avatar,
      contactNumber,
      dob,
    });

    await newAdmin.save();
    return res.status(200).json({
      success: true,
      message: "Admin registered successfully",
      response: newAdmin,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllStudents = async (req, res, next) => {
  try {
    const { department, year } = req.body;
    const students = await Student.find({ department, year });

    if (students.length === 0) {
      return res.status(404).json({ message: "No students found" });
    }

    res.status(200).json({ result: students });
  } catch (err) {
    res
      .status(400)
      .json({ message: `error in getting all students", ${err.message}` });
  }
};

export const adminLogin = async (req, res, next) => {
  try {
    const { errors, isValid } = validateAdminLoginInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { registrationNumber, password } = req.body;
    const admin = await Admin.findOne({ registrationNumber });

    if (!admin) {
      errors.registrationNumber = "Registration number not found";
      return res.status(404).json(errors);
    }

    const isCorrect = await bcrypt.compare(password, admin.password);

    if (!isCorrect) {
      errors.password = "Invalid Credentials";
      return res.status(404).json(errors);
    }

    const payload = {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      contactNumber: admin.contactNumber,
      avatar: admin.avatar,
      registrationNumber: admin.registrationNumber,
      joiningYear: admin.joiningYear,
      department: admin.department,
    };

    try {
      const token = jwt.sign(payload, secretOrKey, { expiresIn: 7200 });
      res.json({
        success: true,
        message: "Login Successfully",
        token: "Bearer " + token,
        admin,
      });
    } catch (err) {
      console.error("Error signing JWT:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (err) {
    console.log("Error in admin login", err.message);
  }
};

export const addStudent = async (req, res, next) => {
  try {
    const { errors, isValid } = validateStudentRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const {
      name,
      email,
      year,
      fatherName,
      aadharCard,
      gender,
      department,
      section,
      dob,
      studentMobileNumber,
      fatherMobileNumber,
    } = req.body;
    const student = await Student.findOne({ email });

    if (student) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    }

    const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
    let departmentHelper;

    if (department === "C.S.E") {
      departmentHelper = "01";
    } else if (department === "E.C.E") {
      departmentHelper = "02";
    } else if (department === "I.T") {
      departmentHelper = "03";
    } else if (department === "Mechanical") {
      departmentHelper = "04";
    } else if (department === "Civil") {
      departmentHelper = "05";
    } else {
      departmentHelper = "06";
    }

    const students = await Student.find({ department });
    let helper;

    if (students.length < 10) {
      helper = "00" + students.length.toString();
    } else if (students.length < 100 && students.length > 9) {
      helper = "0" + students.length.toString();
    } else {
      helper = students.length.toString();
    }

    let hashedPassword;
    hashedPassword = await bcrypt.hash(dob, 10);

    const date = new Date();
    const batch = date.getFullYear();
    const components = ["STUSEC", date.getFullYear(), departmentHelper, helper];

    const registrationNumber = components.join("");

    const newStudent = await new Student({
      name,
      email,
      password: hashedPassword,
      year,
      fatherName,
      aadharCard,
      gender,
      registrationNumber,
      department,
      section,
      batch,
      avatar,
      dob,
      studentMobileNumber,
      fatherMobileNumber,
    });

    await newStudent.save();
    const subjects = await Subject.find({ year });

    if (subjects.length !== 0) {
      for (var i = 0; i < subjects.length; i++) {
        newStudent.subjects.push(subjects[i]._id);
      }
    }

    await newStudent.save();
    res.status(200).json({ result: newStudent });
  } catch (err) {
    res
      .status(400)
      .json({ message: `error in adding new student", ${err.message}` });
  }
};

export const addFaculty = async (req, res, next) => {
  try {
    const { errors, isValid } = validateFacultyRegisterInput(req.body);

    // Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const {
      name,
      email,
      designation,
      department,
      facultyMobileNumber,
      aadharCard,
      dob,
      gender,
    } = req.body;
    const faculty = await Faculty.findOne({ email });

    if (faculty) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    }

    const avatar = gravatar.url(req.body.email, {
      s: "200", // Size
      r: "pg", // Rating
      d: "mm", // Default
    });

    let departmentHelper;

    if (department === "C.S.E") {
      departmentHelper = "01";
    } else if (department === "E.C.E") {
      departmentHelper = "02";
    } else if (department === "I.T") {
      departmentHelper = "03";
    } else if (department === "Mechanical") {
      departmentHelper = "04";
    } else if (department === "Civil") {
      departmentHelper = "05";
    } else {
      departmentHelper = "06";
    }

    const faculties = await Faculty.find({ department });
    let helper;

    if (faculties.length < 10) {
      helper = "00" + faculties.length.toString();
    } else if (faculties.length < 100 && faculties.length > 9) {
      helper = "0" + faculties.length.toString();
    } else {
      helper = faculties.length.toString();
    }

    let hashedPassword;
    hashedPassword = await bcrypt.hash(dob, 10);

    const date = new Date();
    const joiningYear = date.getFullYear();
    const components = ["FAC", date.getFullYear(), departmentHelper, helper];

    const registrationNumber = components.join("");

    const newFaculty = await new Faculty({
      name,
      email,
      designation,
      password: hashedPassword,
      department,
      facultyMobileNumber,
      gender,
      avatar,
      aadharCard,
      registrationNumber,
      dob,
      joiningYear,
    });

    await newFaculty.save();
    res.status(200).json({ result: newFaculty });
  } catch (err) {
    console.log("error", err.message);
    res
      .status(400)
      .json({ message: `error in adding new Faculty", ${err.message}` });
  }
};

export const getAllFaculties = async (req, res, next) => {
  try {
    const faculties = await Faculty.find({});

    if (faculties.length === 0) {
      return res.status(404).json({ message: "No Record Found" });
    }

    res.status(200).json({ result: faculties });
  } catch (err) {
    res
      .status(400)
      .json({ message: `error in getting new Faculty", ${err.message}` });
  }
};

export const addSubject = async (req, res, next) => {
  try {
    const { errors, isValid } = validateSubjectRegisterInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { totalLectures, department, subjectCode, subjectName, year } =
      req.body;
    const existingSubject = await Subject.findOne({ subjectCode });

    if (existingSubject) {
      errors.subjectCode = "Subject with this code already exists";
      return res.status(400).json(errors);
    }
    const newSubject = new Subject({
      totalLectures,
      department,
      subjectCode,
      subjectName,
      year,
    });
    const students = await Student.find({ department, year });

    if (students.length === 0) {
      errors.department = "No students found in the given department and year";
      return res.status(400).json(errors);
    }

    // Allocate the new subject to each student
    for (let i = 0; i < students.length; i++) {
      students[i].subjects.push(newSubject._id);
      await students[i].save();
    }

    // Save the new subject after allocating it to students
    await newSubject.save();

    res.status(200).json({ newSubject });
  } catch (err) {
    console.error(`Error in adding new subject: ${err.message}`);
    return res
      .status(500)
      .json({ error: `Error in adding new subject: ${err.message}` });
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

    res.status(200).json(allSubjects);
  } catch (err) {
    res
      .status(400)
      .json({ message: `error in getting all Subjects", ${err.message}` });
  }
};

export const getAllFaculty = async (req, res, next) => {
  try {
    const { department } = req.body;
    const allFaculties = await Faculty.find({ department });

    if (allFaculties.length === 0) {
      return res.status(404).json({ message: "No Record Found" });
    }

    res.status(200).json({ result: allFaculties });
  } catch (err) {
    console.log("Error in getting all faculties", err.message);
  }
};

export const getAllStudent = async (req, res, next) => {
  try {
    const { department, year } = req.body;
    const allStudents = await Student.find({ department, year });

    res.status(200).json({ result: allStudents });
  } catch (err) {
    console.log("Error in getting all students", err.message);
  }
};

export const getAllSubject = async (req, res, next) => {
  try {
    const { department, year } = req.body;
    const allSubjects = await Subject.find({ department, year });

    res.status(200).json({ result: allSubjects });
  } catch (err) {
    console.log("Error in getting all students", err.message);
  }
};
