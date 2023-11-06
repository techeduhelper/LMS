import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: function (req, file, done) {
    const allowedFileTypes = ["application/pdf", "image/jpeg", "image/png"];

    if (allowedFileTypes.includes(file.mimetype)) {
      done(null, true);
    } else {
      // Prevent the upload
      const newError = new Error("File type is incorrect");
      newError.name = "MulterError";
      done(newError, false);
    }
  },
});

export default upload;
