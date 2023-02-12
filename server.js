const express = require('express');
const { MongoClient } = require('mongodb');
const morgan = require('morgan');
const app = express();

// import got from 'got';
require('dotenv').config()


const {postsRouter} = require('./src/routers/postsRourter')

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const dbName = 'testGoITdb';


// process.ENV

// const PORT = 8081;
const PORT = process.env.PORT || 8082;

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/posts', postsRouter)


/*app.listen(PORT, (err) => {
    if (err) {
        console.error('Error at server launch:', err);
    }
    console.log(`Server works at port ${PORT}`);
});*/

const start = async () => {

    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const PostsCollection = db.collection('posts');

    // const addPost =  await PostsCollection.insertOne({topic: "toptop2", text: "textex2"})
    // await PostsCollection.insertOne({topic: "toptop3", text: "textex3"})


    const posts = await PostsCollection.find({}).toArray();
    console.log(posts);

    app.listen(PORT, (err) => {
        if (err) {
            console.error('Error at server launch:', err);
        }
        console.log(`Server works at port ${PORT}`);
    });
}

start()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
