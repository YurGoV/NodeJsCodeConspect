const express = require('express');
const morgan = require('morgan');
const got = require('got');
const app = express();
// import got from 'got';
require('dotenv').config()

// todo: 1.2 // 1:52:20 - розгорнути простий веб-сервер
// 1:57:0 - middleware morgan//тільки установка та лог у консоль
//2.3 - 11:00 - start (MVC)

const {router} = require('./booksRourter')

// process.ENV

// const PORT = 8081;
const PORT = process.env.PORT || 8082;//без додаткових пакетів дозволяє запуска ти в консолі з кастомним
//портом,наприклад $ PORT=8082 node server.js
//або з dotenv - можна зчитати та застосовувати
const thirdPartyApiKey = process.env.WEATHER_API_KEY;

app.use(express.json());
app.use(express.urlencoded({extended: true}));//обробка стандартних даних хтмл-форм ?? deprecated
app.use(express.static('public'));// дозволяє зробити директорію публічною
app.use(morgan('tiny'));
// app.use(router);
// app.use('/api', router);


app.get('/weather', async (req, res) => {
    try {
        //req.query.param
        //req.params --- '/weather:city'
        //req.body - later
        //req.header - later

        const {
            latitude,
            longitude
        } = req.query;

        if (!latitude || !longitude) {
           return res.status(400).json({message: 'latitude and longitude is mandatory'})
        }
        console.log('llll');

        const response = await got('http://api.weatherbit.io/v2.0/current', {
            searchParams: {
                // key: '161b71ae33f348868722ad1c9f0e1796',
                key: thirdPartyApiKey,
                // lat: '48.4752389',
                // lon: '35.037077',
                lat: latitude,
                lon: longitude,
            },

            responseType: 'json'
        });

        const [weatherData] = response.body.data
        const {
            city_name,
            weather: {description},
            temp
        } = weatherData;
        res.json({city_name, description, temp})
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

//todo: CORS 1:31:30 // 2.3
//todo: HEROKU 1:39:45 // 2.3
//todo: DEBUGGING 1:56:20 // 2.3 // --inspect, breakpoints
