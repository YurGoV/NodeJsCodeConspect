const ObjectId = require('mongodb').ObjectId;

const getPosts = async (req, res) => {
  const posts = await req.db.PostsCollection.find({}).toArray();
  res.json({posts});
};

const getPostById = async (req, res) => {
  const {id} = req.params;
  const post = await req.db.PostsCollection.findOne({_id: new ObjectId(id)});
  if (!post) {
    return res.status(400).json({status: `no post with id ${id} found`});
  }
  res.json({post, status: 'success'});
};

const addPost = async (req, res) => {
  const {
    topic, text,
  } = req.body;
  await req.db.PostsCollection.insertOne({topic, text});
  res.json({status: 'success'});
};

const changePost = async (req, res) => {
  const {
    topic, text,
  } = req.body;
  const {id} = req.params;
  await req.db.PostsCollection.updateOne({_id: new ObjectId(id)},
      {$set: {topic, text}});
  res.json({status: 'success'});
};

const patchPost = (req, res) => {// todo

};

const deletePost = async (req, res) => {
  const {id} = req.params;

  const post = await req.db.PostsCollection.findOne(
      {_id: new ObjectId(id)});
  if (!post) {
    return res.status(400).json(
        {status: `no post with id ${id} found. nothing yo delete`});
  }

  await req.db.PostsCollection.deleteOne({_id: new ObjectId(id)});
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
