const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
})

const upload = multer({
    storage: storage,
    filefilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/jfif") {
            cb(null, true);
        } else {
           console.log('Only .png, .jpg and .jpeg format allowed!');
           cb(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})
module.exports = upload
