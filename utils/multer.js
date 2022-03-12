const multer = require("multer");
const path = require("path");
const fs = require("fs");
module.exports.upload = function upload(prefix) {
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            const path = `./uploads`;
            fs.mkdirSync(path, { recursive: true });
            return cb(null, path);
        },
        filename: function(req, file, cb) {
            const regEx = /\.[a-zA-Z]{3,4}$/;

            const ext = file.originalname.match(regEx);
            const name = file.originalname.slice(0, -ext[0].length);
            let filename = `${name}-${Date.now()}${ext}`;

            const space = /\s/gi;
            filename = filename.replace(space, "-");

            if (prefix) {
                filename = `${prefix}/${filename}`;
            }

            req._image = filename;
            cb(null, filename);
        },
    });
    return multer({ storage: storage });
};