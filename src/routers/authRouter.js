const express = require('express');
const router = new express.Router();

/*const {
    addPostValidation,
    patchPostValidation,
} = require('../middlewars/validationMiddleware');*/

const {
    asyncWrapper,
} = require('../helpers/apiHelpers');

// const modelsMiddleware = require('../middlewars/models');

/*const {
    getPostsController,
    getPostByIdController,
    addPostController,
    changePostController,
    patchPostController,
    deletePostController,
} = require('../controllers/postsController');*/

// router.use(modelsMiddleware);

const {
    registrationController,
    loginController,
} = require('../controllers/authController')


// POST /api/auth/registration
router.post('/registration', asyncWrapper(registrationController));

// GET /api/posts/id
router.post('/login', asyncWrapper(loginController));

/*// POST /api/posts/ => newPost
router.post('/', addPostValidation, asyncWrapper(addPostController));

// PUT /api/posts/id
router.put('/:id', addPostValidation, asyncWrapper(changePostController));

// PATCH /api/posts/id
router.patch('/:id', patchPostValidation, asyncWrapper(patchPostController));

// DELETE /api/posts/id
router.delete('/:id', asyncWrapper(deletePostController));*/

module.exports = {authRouter: router};
