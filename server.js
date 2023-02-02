const express = require('express');
const morgan = require('morgan');
const got = require('got');
const app = express();
// import got from 'got';

// todo: 1.2 // 1:52:20 - розгорнути простий веб-сервер
// 1:57:0 - middleware morgan//тільки установка та лог у консоль
//2.3 - 11:00 - start (MVC)

const {router} = require('./booksRourter')



const PORT = 8081;

app.use(express.json());
app.use(express.urlencoded({extended: true}));//обробка стандартних даних хтмл-форм ?? deprecated
app.use(express.static('public'));// дозволяє зробити директорію публічною
app.use(morgan('tiny'));
// app.use(router);
// app.use('/api', router);


//todo: pause 45m (2.3)

app.get('/weather', async (req, res) => {
    try {
        const response = await got('http://api.weatherbit.io/v2.0/current', {searchParams: {
            key: '161b71ae33f348868722ad1c9f0e1796',
                lat: '48.4752389',
                lon: '35.037077',
            },
            responseType: 'json'
        });
        res.json({response: response.body})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
    })



app.listen(PORT, (err) => {
    if (err) {
        console.error('Error at server launch:', err);
    }
    console.log(`Server works at port ${PORT}`);
});

//todo: pause - 1.2 1h45m