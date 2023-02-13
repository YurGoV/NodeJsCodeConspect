const express = require('express');
const router = new express.Router();

const {
  addPostValidation,
  patchPostValidation,
} = require('../middlewars/validationMiddleware');

const modelsMiddleware = require('../middlewars/models');

const {
  getPosts,
  getPostById,
  addPost,
  changePost,
  patchPost,
  deletePost,
} = require('../controllers/postsController');

router.use(modelsMiddleware);

// GET /api/posts
router.get('/', getPosts);

// GET /api/posts/id
router.get('/:id', getPostById);

// POST /api/posts/ => newPost
router.post('/', addPostValidation, addPost);

// PUT /api/posts/id
router.put('/:id', addPostValidation, changePost);

// PATCH /api/posts/id
router.patch('/:id', patchPostValidation, patchPost);

// DELETE /api/posts/id
router.delete('/:id', deletePost);

module.exports = {postsRouter: router};
