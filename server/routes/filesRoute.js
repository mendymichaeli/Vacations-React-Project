const express = require('express');
const router = express.Router();
const filesController = require('../controllers/filesController')
var multer = require('multer');


var storageObj = multer.diskStorage({
    // destination
    destination: function (req, file, cb) {
        console.log("File : ", file)

        if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/gif')
            cb(null, './uploads')
        else if (file.mimetype == 'application/pdf')
            cb(null, './uploads/pdf')
    },
    filename: function (req, file, cb) {
        let dt = new Date().getTime();
        cb(null, String(dt) + "_" + file.originalname);
    }
});

var upload = multer({ storage: storageObj });

router.post('/upload', upload.array("uploads[]", 12), filesController.UploadFiles);

module.exports = router;