const {Post} = require('../db/postModel');
const {WrongPostIdError} = require('../helpers/errors')



const getPosts = async () => {
    const posts = await Post.find({});
    return posts;
};

const getPostById = async (id) => {
    const post = await Post.findById(id);

    if (!post) {
        throw new WrongPostIdError( `no post with id ${id} found`)
    }
    return post;
};

const addPost = async ({topic, text}) => {

    const post = new Post({topic, text});
    await post.save()
};

const changePostById = async (id, {topic, text}) => {
    await Post.findByIdAndUpdate(id,
        {$set: {topic, text}}
    )
};

const deletePostById = async (id) => {
    await Post.findByIdAndRemove(id);
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