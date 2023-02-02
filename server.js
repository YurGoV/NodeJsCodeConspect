const express = require('express');
const morgan = require('morgan')
const app = express();

// todo: 1.2 // 1:52:20 - розгорнути простий веб-сервер
// 1:57:0 - middleware morgan//тількти установка та лог у консоль

const PORT = 8081;

app.use(express.json());
app.use(express.urlencoded({extended: true}));//обробка стандартних даних хтмл-форм ?? deprecated
app.use(express.static('public'));// дозволяє зробити директорію публічною
app.use(morgan('tiny'));

// app.get('/home', (request, response) => {
//     response.sendStatus(200);
// })

/*app.use( (request, response, next) => {
    // response.send('middleware request');
    // response.status(500).json({status: '500 ))'})
    console.log(`${request.method} ${request.originalUrl} ${new Date().toISOString()}`);
    next();
})*/



app.get('/home', (request, response) => {
    // response.send('get request');
    response.json([//автоматом робитьт JSON.stringify
        {type: 'get response',
            format: 'json'},
        {content: 'test message',
            contentType: 'string'}
    ])
})

app.post('/home', (req, res) => {
    // response.send('post request');
    if(!req.body.id) {
        res.status(400).json({status: 'id parametr is required'})//валідація запиту 1:55
    }
    console.log(req.body);
    res.json({javascript: 'object', body: req.body})
    const {id} = req.body;
    console.log(id);

})

app.delete('/home', (request, response) => {
    response.send('delete request');
})



// app.get('/home' - це routing

/*    (request, response) => {
    // response.send('middleware request');              це middleware (обробник запиту, але не тільки)
    response.status(500).json({status: '500 ))'})
}*/

/*app.use( (request, response, next) => {
    // response.send('middleware request');
    // response.status(500).json({status: '500 ))'})
    console.log(`${request.method} ${request.originalUrl} ${new Date().toISOString()}`);
    next()
})*/

app.listen(PORT, (err) => {
    if (err) {
        console.error('Error at server launch:', err);
    }
    console.log(`Server works at port ${PORT}`);
});

//todo: pause - 1.2 1h45m