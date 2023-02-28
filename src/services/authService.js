const {User} = require('../db/userModel');
const {UnAuthorizedError} = require('../helpers/errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const registration = async (email, password) => {
    // email, password -> new User(email, password)

    console.log('in authServise :', email, password);
    // const salt = bcrypt.genSaltSync(10);
    const user = new User({
        email, password,
    });
    await user.save();
};

const login = async (email, password) => {

    const user = await User.findOne({email});
    if (!user) {
        throw new UnAuthorizedError(`No user with ${email} found`);
    }
    console.log('user.password in authService', user.password);

    if (!await bcrypt.compare(password, user.password)) {
        throw new UnAuthorizedError(`Wrong password`);
    }

    const token = jwt.sign({
        _id: user._id,
        createdAt: user.createdAt,
    }, process.env.JWT_SECRET);

    console.log('token  in authService', token);

    return token;

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


