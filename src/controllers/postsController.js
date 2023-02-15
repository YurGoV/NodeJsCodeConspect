// const ObjectId = require('mongodb').ObjectId;
const {Post} = require('../db/postModel');

const getPosts = async (req, res) => {
  // const posts = await req.db.PostsCollection.find({}).toArray();
  const posts = await Post.find({})
  res.json({posts});
};

const getPostById = async (req, res) => {
  const {id} = req.params;
  // const post = await req.db.PostsCollection.findOne({_id: new ObjectId(id)});

  const post = await Post.findById(id);

  if (!post) {
    return res.status(400).json({status: `no post with id ${id} found`});
  }

  res.json({post, status: 'success'});
};

const addPost = async (req, res) => {
  const {
    topic, text,
  } = req.body;
  // await req.db.PostsCollection.insertOne({topic, text});

  const post = new Post({topic, text});
  await post.save()
  res.json({status: 'success'});
};

const changePost = async (req, res) => {
  const {
    topic, text,
  } = req.body;
  const {id} = req.params;
  // await req.db.PostsCollection.updateOne({_id: new ObjectId(id)},
  //     {$set: {topic, text}});
  await Post.findByIdAndUpdate(id,
      {$set: {topic, text}}
      )
  res.json({status: 'success'});
};

const patchPost = (req, res) => {// todo

};

const deletePost = async (req, res) => {
  const {id} = req.params;
  //
  // const post = await req.db.PostsCollection.findOne(
  //     {_id: new ObjectId(id)});
  // if (!post) {
  //   return res.status(400).json(
  //       {status: `no post with id ${id} found. nothing yo delete`});
  // }
  //
  // await req.db.PostsCollection.deleteOne({_id: new ObjectId(id)});
  await Post.findByIdAndRemove(id);

  res.json({status: 'success'});
};

module.exports = {
  getPosts,
  getPostById,
  addPost,
  changePost,
  patchPost,
  deletePost,
};
