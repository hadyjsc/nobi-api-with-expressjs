const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let dir = `${process.env.STATIC_MEDIA}`;

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, 0777);
        }

        cb(null, dir);
    },
    filename: function(req, file, cb) {
        const ext = path.extname(file.originalname).substr(1);
        cb(null, new Date().getTime() + '.' + ext);
    }
});

const limits = {
    files: 1,
    fileSize: 1024 * 1024 * 100
};

const fileFilter = (req, file, cb) => {
    if (file.mimetype !== 'text/csv') {
        return cb(new Error('Only CSV file allowed.'))
    } else {
        cb(null, true);
    }
};

const upload = multer({
    storage: storage,
    limits: limits,
    fileFilter: fileFilter
});

module.exports = {
    upload
};