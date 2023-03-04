const express = require('express');
const { MongoClient } = require('mongodb');
const morgan = require('morgan');
const app = express();

// import got from 'got';
require('dotenv').config()


const  {connectMongo} = require('./src/db/connection')
const {postsRouter} = require('./src/routers/postsRourter')
const {authRouter} = require('./src/routers/authRouter')
const {filesRouter} = require('./src/routers/filesRouter')
const {errorHandler} = require('./src/helpers/apiHelpers')

const PORT = process.env.PORT || 8082;
const MONGO_URL = process.env.MONGO_URL
const MONGO_DB_NAME = process.env.MONGO_DB_NAME


// const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(MONGO_URL);
// const dbName = 'testGoITdb';

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);
app.use('/api/files', filesRouter)

app.use(errorHandler);


const start = async () => {

    await connectMongo();

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
