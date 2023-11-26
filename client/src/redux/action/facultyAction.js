import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  SET_FACULTY,
  SET_ERRORS,
  SET_FLAG,
  SET_ERRORS_HELPER,
  ADD_NOTICE,
} from "../actionTypes";
import toast from "react-hot-toast";

const setFaculty = (data) => {
  return {
    type: SET_FACULTY,
    payload: data,
  };
};

const url = import.meta.env.VITE_URL;

const fetchStudentsHelper = (data) => {
  return {
    type: "FETCH_STUDENTS",
    payload: data,
  };
};

const subjectCodeListHelper = (data) => {
  return {
    type: "GET_SUBJECTCODE_LIST",
    payload: data,
  };
};

export const updateFetchedStudentsHelper = (value) => {
  return {
    type: "UPDATE_FETCHED_STUDENTS_HELPER",
    payload: value,
  };
};

export const facultyLogin = (facultyCredential) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "Post",
        url: url + "/api/faculty/login",
        data: facultyCredential,
      });
      const { token } = data;
      localStorage.setItem("facultyJwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setFaculty(decoded));
      toast.success("Login Successfully");
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    }
  };
};

export const facultyUpdatePassword = (passwordData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "Post",
        url: url + "/api/faculty/updatePassword",
        data: passwordData,
      });
      toast.success("Password Updated Successfully");
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    }
  };
};

export const getOTPFaculty = (studentEmail) => {
  return async (dispatch) => {
    try {
      await axios({
        method: "Post",
        url: url + "/api/faculty/forgotPassword",
        data: studentEmail,
      });
      alert("Otp has been sent to your email");
      dispatch({ type: SET_FLAG });
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    }
  };
};

export const submitOTPFaculty = (newPasswordWithOtp, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "Post",
        url: url + "/api/faculty/postOTP",
        data: newPasswordWithOtp,
      });
      alert("Password Update, kindly login with updated password");
      history.push("/");
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    }
  };
};

export const fetchStudents = (department, year, section) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "Post",
        url: url + "/api/faculty/fetchStudents",
        data: { department, year, section },
      });
      dispatch(fetchStudentsHelper(data.result));
      dispatch(subjectCodeListHelper(data.subjectCode));
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    }
  };
};

const facultyUpdateProfileFlag = (data) => {
  return {
    type: "FACULTY_UPDATE_PROFILE_FLAG",
    payload: data,
  };
};

export const facultyUpdate = (updatedData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "Post",
        url: url + `/api/faculty/updateProfile`,
        data: updatedData,
      });
      dispatch(facultyUpdateProfileFlag(true));
      toast.success("Profile Updated Successfully");
    } catch (err) {
      console.log("Error in sending message", err.message);
    }
  };
};

const addNoticeSuccess = (data) => {
  return {
    type: ADD_NOTICE,
    payload: true,
  };
};

export const addNotice = (noticeData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${url}/api/faculty/addNotice`,
        noticeData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Notice added successfully");
      dispatch(addNoticeSuccess(data));
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    }
  };
};

export const markAttendence = (
  selectedStudents,
  subjectCode,
  department,
  year,
  section
) => {
  return async (dispatch) => {
    try {
      await axios({
        method: "Post",
        url: url + "/api/faculty/markAttendance",
        data: { selectedStudents, subjectCode, department, year, section },
      });
      dispatch({
        type: "HELPER",
        payload: true,
      });
      toast.success("attendence has been marked successfully");
    } catch (err) {
      toast.error("Error in marking attendence, faculty action", err.message);
    }
  };
};

export const uploadMarks = (
  subjectCode,
  exam,
  totalMarks,
  marks,
  department,
  year,
  section
) => {
  return async (dispatch) => {
    try {
      await axios({
        method: "Post",
        url: url + "/api/faculty/uploadMarks",
        data: {
          subjectCode,
          exam,
          totalMarks,
          marks,
          department,
          year,
          section,
        },
      });
      alert("Mark uploaded successfully");
      dispatch({
        type: "HELPER",
        payload: true,
      });
    } catch (err) {
      dispatch({
        type: SET_ERRORS_HELPER,
        payload: err.response.data,
      });
    }
  };
};

export const setFacultyUser = (data) => {
  return {
    type: SET_FACULTY,
    payload: data,
  };
};

export const facultyLogout = () => (dispatch) => {
  localStorage.removeItem("facultyJwtToken");
  setAuthToken(false);
  dispatch(setFaculty({}));
  toast.success("Logout Successfully");
};
