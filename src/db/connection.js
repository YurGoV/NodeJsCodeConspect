const {MongoClient} = require('mongodb');
const collections = {};

const getCollections = () => {
  return collections;
};

require('dotenv').config();


const MONGO_URL = process.env.MONGO_URL;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

const client = new MongoClient(MONGO_URL);


const connectMongo = async () => {
  await client.connect();
  console.log('Connected successfully to MongoDB server');
  const db = client.db(MONGO_DB_NAME);
  collections.PostsCollection = db.collection('posts');
  console.log('DB connected');
};

module.exports = {
  connectMongo,
  getCollections,
};
