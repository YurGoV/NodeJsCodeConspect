const {MongoClient} = require("mongodb");
const collections = {};

const getCollections = () => {
    return collections;
}

require('dotenv').config()


const MONGO_URL = process.env.MONGO_URL
const MONGO_DB_NAME = process.env.MONGO_DB_NAME
// const collections = require('./collections')

const client = new MongoClient(MONGO_URL);


const connectMongo = async () => {
    await client.connect();
    console.log('Connected successfully to MongoDB server');
    const db = client.db(MONGO_DB_NAME);

    // collections.PostsCollection = db.collection('posts');
    // const PostsCollection = db.collection('posts');
    collections.PostsCollection = db.collection('posts');
    console.log('DB connected');

    // return {PostsCollection};

    // const PostsCollection = db.collection('posts');// moved to collections

    // const addPost =  await PostsCollection.insertOne({topic: "toptop2", text: "textex2"})
    // await PostsCollection.insertOne({topic: "toptop4", text: "textex4"})


    // const posts = await PostsCollection.find({}).toArray();
}

module.exports = {
    connectMongo,
    getCollections
};