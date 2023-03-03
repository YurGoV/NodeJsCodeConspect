const express = require('express');
const multer = require('multer');
const path = require('path');

const router = new express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('../../tmp'))
    },
});


const {
    asyncWrapper,
} = require('../helpers/apiHelpers');

const {
    uploadController,
} = require('../controllers/filesController');


// POST /api/files/upload
router.post('/upload', asyncWrapper(uploadController));


module.exports = {authRouter: router};
