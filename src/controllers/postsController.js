// const {Post} = require('../db/postModel');
const {
    getPosts,
    getPostById,
    addPost,
    changePostById,
    deletePostById,
} = require('../services/postsService');

const getPostsController = async (req, res) => {
    // console.log('req in postsController (getPosts...', req);
    console.log('req.user & req.token in postsController (getPosts...', req.user, req.token);

    const {_id: userId} = req.user;
    let { // todo: pagination
        skip = 0,
        limit = 5
    } = req.query;
    limit = parseInt(limit) > 10 ? 10 : parseInt(limit);// todo add pages count
    skip = parseInt(skip) > 10 ? 10 : parseInt(skip);

    const posts = await getPosts(userId, {skip, limit});
    // console.log('posts in postsController (getPosts...', posts);// all fine
    res.json({posts, skip, limit});
};

const getPostByIdController = async (req, res) => {
    const {id: postId} = req.params;
    const {_id: userId} = req.user;

    const post = await getPostById(postId, userId);
    res.json({post, status: 'success'});
};

const addPostController = async (req, res) => {
    const {
        topic, text,
    } = req.body;
    const {_id: userId} = req.user;

    await addPost({topic, text}, userId)
    res.json({status: 'success'});
};

const changePostController = async (req, res) => {
    const {
        topic, text,
    } = req.body;
    const {id: postId} = req.params;
    const {_id: userId} = req.user;
    ;

    await changePostById(postId, {topic, text}, userId);
    res.json({status: 'success'});
};

const patchPostController = (req, res) => {// todo

};

const deletePostController = async (req, res) => {
    const {_id: userId} = req.user;
    const {id: postId} = req.params;

    await deletePostById(postId, userId);

    res.json({status: 'success'});
};

module.exports = {
    getPostsController,
    getPostByIdController,
    addPostController,
    changePostController,
    patchPostController,
    deletePostController,
};
