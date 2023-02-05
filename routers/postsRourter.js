const express = require('express');
const router = express.Router();
const Joi = require('joi');


let posts = [{
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
];

//GET /api/posts
router.get('/', (req, res) => {
    res.json({posts, status: 'success'})
});

//GET /api/posts/id
router.get('/:id', (req, res) => {
    const {id} = req.params;
    const [post] = posts.filter(item => item.id === id);
    if (!post) {
        return res.status(400).json({status: `no post with id ${id} found`})
    }
    res.json({post, status: 'success'})
})

//POST /api/posts/ => newPost
router.post('/', (req, res) => {
    const id = new Date().getTime().toString();
    console.log(id);
    const {
        topic, text
    } = req.body;

    const schema = Joi.object({
        topic: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        text: Joi.string()
            .alphanum()
            .min(10)
            .max(400)
            .required(),
    })
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({status: validationResult.error.details[0].message})
    }


    posts.push({
        id,
        topic,
        text
    });
    res.json({status: 'success'})
})

//PUT /api/posts/id
router.put('/:id', (req, res) => {
    const {
        topic, text
    } = req.body;

    posts.forEach(post => {
        if (post.id === req.params.id) {
            post.topic = topic;
            post.text = text;
        }
    })
    res.json({status: 'success'})
});

//PATCH /api/posts/id
router.patch('/:id', (req, res) => {
    const {
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
    res.json({status: 'success'})
});

//DELETE /api/posts/id
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    const [post] = posts.filter(item => item.id === id);
    if (!post) {
        return res.status(400).json({status: `no post with id ${id} found`})
    }

    posts = posts.filter(item => item.id !== id);
    res.json({status: 'success'})
})

module.exports = {postsRouter: router}