const express = require('express');
const morgan = require('morgan');
const app = express();

// import got from 'got';
require('dotenv').config()


const {postsRouter} = require('./routers/postsRourter')

// process.ENV

// const PORT = 8081;
const PORT = process.env.PORT || 8082;

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/posts', postsRouter)


app.listen(PORT, (err) => {
    if (err) {
        console.error('Error at server launch:', err);
    }
    console.log(`Server works at port ${PORT}`);
});


