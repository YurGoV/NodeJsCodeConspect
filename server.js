const express = require('express');
const { MongoClient } = require('mongodb');
const morgan = require('morgan');
const app = express();

// import got from 'got';
require('dotenv').config()


const {postsRouter} = require('./src/routers/postsRourter')


const  {connectMongo} = require('./src/db/connection')

const PORT = process.env.PORT || 8082;
const MONGO_URL = process.env.MONGO_URL
const MONGO_DB_NAME = process.env.MONGO_DB_NAME


// const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(MONGO_URL);
// const dbName = 'testGoITdb';

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/posts', postsRouter)



const start = async () => {

    await connectMongo();

    // await client.connect();
    // console.log('Connected successfully to server');
    // const db = client.db(MONGO_DB_NAME);
    // const PostsCollection = db.collection('posts');

    // const addPost =  await PostsCollection.insertOne({topic: "toptop2", text: "textex2"})
    // await PostsCollection.insertOne({topic: "toptop4", text: "textex4"})


    // const posts = await PostsCollection.find({}).toArray();
    // console.log(posts);

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
