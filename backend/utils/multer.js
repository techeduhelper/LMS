import multer from 'multer';

// Specify the storage engine
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: function (req, file, done) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
            done(null, true);
        } else {
            // Prevent the upload
            const newError = new Error('File type is incorrect');
            newError.name = 'MulterError';
            done(newError, false);
        }
    }
});

export default upload;
