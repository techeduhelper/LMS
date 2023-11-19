import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
});

const Application = mongoose.model("Application", applicationSchema);

export default Application;
