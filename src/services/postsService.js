const {Post} = require('../db/postModel');
const {WrongPostIdError, UnAuthorizedError} = require('../helpers/errors')



const getPosts = async (userId) => {
    console.log('userId in postsService: ', userId);
    const posts = await Post.find({userId});// todo ??? find by userId ???
    return posts;
};

const getPostById = async (postId, userId) => {
    const post = await Post.findOne({_id: postId, userId});// todo: check

    if (!post) {
        throw new WrongPostIdError( `no post with id ${postId} found`)
    }
    return post;
};

const addPost = async ({topic, text}, userId) => {

    const post = new Post({topic, text, userId});
    await post.save()
};

const changePostById = async (postId, {topic, text}, userId) => {
    await Post.findOneAndUpdate(
        {_id: postId, userId},
        {$set: {topic, text}}
    )
};

const deletePostById = async (postId, userId) => {
    await Post.findOneAndRemove({_id: postId, userId});
};

module.exports = {
    getPosts,
    getPostById,
    addPost,
    changePostById,
    deletePostById,
}


    // todo: https://www.freecodecamp.org/news/module-exports-how-to-export-in-node-js-and-javascript/
// todo: https://www.tutorialsteacher.com/nodejs/nodejs-module-exports