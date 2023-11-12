import mongoose from "mongoose";

const { Schema } = mongoose;

const markSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "student",
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: "subject",
  },
  exam: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    default: 0,
  },
  totalMarks: {
    type: Number,
    default: 100,
  },
  department: {
    type: String,
  },
  semester: {
    type: Number,
  },
  section: {
    type: String,
  },
});

const Mark = mongoose.model("mark", markSchema);

export default Mark;
