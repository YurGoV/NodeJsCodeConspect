const {User} = require('../db/userModel');
const bcrypt = require('bcrypt');
const {UnAuthorized} = require('../helpers/errors')



const registration = async (email, password) => {
    // email, password -> nw User(email, password)


    const user = new User({
        email, password: await bcrypt.hash(password, 10)
    });
    await user.save();
};

const login = async (id) => {
    /*const post = await Post.findById(id);

    if (!post) {
        throw new WrongPostIdError( `no post with id ${id} found`)
    }
    return post;*/
};

/*const addPost = async ({topic, text}) => {

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
};*/

module.exports = {
    registration,
    login,
    /*addPost,
    changePostById,
    deletePostById,*/
}


