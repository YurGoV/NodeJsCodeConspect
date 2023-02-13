const {connectMongo} = require('../db/connection')
const ObjectId = require('mongodb').ObjectId;

/*let posts = [{
    id: '1',
    topic: 'test1',
    text: 'post text1',
},
    {
        id: '2',
        topic: 'test2',
        text: 'post text2',
    },
    {
        id: '3',
        topic: 'test3',
        text: 'post text3',
    },
];*/

// const posts = await PostsCollection.find({}).toArray();
// console.log(posts);

// const getPosts = (req, res) => {
//     res.json({posts, status: 'success'})
// };
const getPosts = async (req, res) => {
    // const {PostsCollection} = require('../db/collections')

    /*const {PostsCollection} = await connectMongo();
    const posts = await PostsCollection.find({}).toArray();
    res.json({posts})*/
    // console.log(req.db);

    const posts = await req.db.PostsCollection.find({}).toArray();
    res.json({posts});
};

// const getPostById = (req, res) => {
const getPostById = async (req, res) => {
    /*const {id} = req.params;
    const [post] = posts.filter(item => item.id === id);
    if (!post) {
        return res.status(400).json({status: `no post with id ${id} found`})
    }
    res.json({post, status: 'success'})*/

    const {id} = req.params;
    const post = await req.db.PostsCollection.findOne({_id: new ObjectId(id)});
    if (!post) {
        return res.status(400).json({status: `no post with id ${id} found`})
    }
    res.json({post, status: 'success'})
};

// const addPost = (req, res) => {
const addPost = async (req, res) => {
    /*const id = new Date().getTime().toString();
    console.log(id);
    const {
        topic, text
    } = req.body;


    posts.push({
        id,
        topic,
        text
    });
    res.json({status: 'success'})*/
    const {
        topic, text
    } = req.body;
    await req.db.PostsCollection.insertOne({topic, text})
    res.json({status: 'success'})
};

// const changePost = (req, res) => {
const changePost = async (req, res) => {
    /*const {
        topic, text
    } = req.body;

    posts.forEach(post => {
        if (post.id === req.params.id) {
            post.topic = topic;
            post.text = text;
        }
    })
    res.json({status: 'success'})*/
    const {
        topic, text
    } = req.body;
    const {id} = req.params;
    await req.db.PostsCollection.updateOne({_id: new ObjectId(id)}, {$set: {topic, text}});
    res.json({status: 'success'})
};

const patchPost = (req, res) => {// todo
    /*const {
        topic, text
    } = req.body;

    posts.forEach(post => {
        if (post.id === req.params.id) {
            if (topic) {
                post.topic = topic;
            }
            if (text) {
                post.text = text;
            }
        }
    })
    res.json({status: 'success'})*/
};

// const deletePost = (req, res) => {
const deletePost = async (req, res) => {
    /*const {id} = req.params;
    const [post] = posts.filter(item => item.id === id);
    if (!post) {
        return res.status(400).json({status: `no post with id ${id} found`})
    }

    posts = posts.filter(item => item.id !== id);
    res.json({status: 'success'})*/
    const {id} = req.params;

    const post = await req.db.PostsCollection.findOne({_id: new ObjectId(id)});
    if (!post) {
        return res.status(400).json({status: `no post with id ${id} found. nothing yo delete`})
    }

    await req.db.PostsCollection.deleteOne({_id: new ObjectId(id)});
    res.json({status: 'success'})
};

module.exports = {
    getPosts,
    getPostById,
    addPost,
    changePost,
    patchPost,
    deletePost,
}
