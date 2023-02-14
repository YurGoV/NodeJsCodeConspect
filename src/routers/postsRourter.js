const express = require('express');
const router = new express.Router();

const {
  addPostValidation,
  patchPostValidation,
} = require('../middlewars/validationMiddleware');

const {
  asyncWrapper,
} = require('../helpers/apiHelpers');

// const modelsMiddleware = require('../middlewars/models');

const {
  getPosts,
  getPostById,
  addPost,
  changePost,
  patchPost,
  deletePost,
} = require('../controllers/postsController');

// router.use(modelsMiddleware);


// GET /api/posts
router.get('/', asyncWrapper(getPosts));

// GET /api/posts/id
router.get('/:id', asyncWrapper(getPostById));

// POST /api/posts/ => newPost
router.post('/', addPostValidation, asyncWrapper(addPost));

// PUT /api/posts/id
router.put('/:id', addPostValidation, asyncWrapper(changePost));

// PATCH /api/posts/id
router.patch('/:id', patchPostValidation, asyncWrapper(patchPost));

// DELETE /api/posts/id
router.delete('/:id', asyncWrapper(deletePost));

module.exports = {postsRouter: router};
