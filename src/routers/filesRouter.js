const express = require('express');
const multer = require('multer');
const { v4: uuid } = require('uuid');
const path = require('path');

const router = new express.Router();

const FILE_DIR =  path.resolve('./tmp');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, FILE_DIR)
    },
    filename: (req, file, cb) => {
        const [filename, extension] = file.originalname.split('.');
        cb(null, `${filename}_${uuid()}.${extension}`)
    }
});


const {
    asyncWrapper,
} = require('../helpers/apiHelpers');

const {
    uploadController,
} = require('../controllers/filesController');

const uploadMiddleware = multer({storage});

// POST /api/files/upload
router.post('/upload', uploadMiddleware.single('avatar'), asyncWrapper(uploadController));
router.use('/download', express.static(FILE_DIR));



module.exports = {filesRouter: router};
