import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: String,
  content: String,
  file: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  publisher: String,
  publisherName: String,
});

const Notice = mongoose.model("Notice", noticeSchema);

export default Notice;
