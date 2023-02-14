// const {MongoClient} = require('mongodb');
// const collections = {};
const mongoose = require('mongoose');

// const getCollections = () => {
//   return collections;
// };

require('dotenv').config();


const MONGO_URL = process.env.MONGO_URL;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

// const client = new MongoClient(MONGO_URL);


const connectMongo = async () => {
    // await client.connect();
    // console.log('Connected successfully to MongoDB server');
    // const db = client.db(MONGO_DB_NAME);
    // collections.PostsCollection = db.collection('posts');
    // console.log('DB connected');
    mongoose.set("strictQuery", false);// todo: write more about " DeprecationWarning: Mongoose:
    // the `strictQuery` option will be switched back to `false` by default in Mongoose
    // 7. Use `mongoose.set('strictQuery', false);`"
    return mongoose.connect(MONGO_URL)
};

module.exports = {
    connectMongo,
    // getCollections,
};
