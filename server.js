const express = require('express');
const app = express();

const PORT = 8081;

// app.get('/home', (request, response) => {
//     response.sendStatus(200);
// })



app.get('/home', (request, response) => {
    // response.send('get request');
    response.json([//автоматом робитьт JSON.stringify
        {type: 'get response',
            format: 'json'},
        {content: 'test message',
            contentType: 'string'}
    ])
})

app.post('/home', (request, response) => {
    response.send('post request');
})

app.delete('/home', (request, response) => {
    response.send('delete request');
})


// app.get('/home' - це routing

/*    (request, response) => {
    // response.send('middleware request');              це middleware (обробник запиту, але не тільки)
    response.status(500).json({status: '500 ))'})
}*/

app.use( (request, response) => {
    // response.send('middleware request');
    response.status(500).json({status: '500 ))'})
})

app.listen(PORT, (err) => {
    if (err) {
        console.error('Error at server launch:', err);
    }
    console.log(`Server works at port ${PORT}`);
});

//todo: pause - 1.2 1h34m