const express = require('express');
const router = new express.Router();

const {
  addPostValidation,
  patchPostValidation,
} = require('../middlewars/validationMiddleware');

const {
  getPosts,
  getPostById,
  addPost,
  changePost,
  patchPost,
  deletePost,
} = require('../../controllers/postController');

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
