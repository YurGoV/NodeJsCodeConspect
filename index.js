const http = require('http');

const PORT = 8081;

//59:25 - резюме (огляд того, що зроблено з натbвним методом http)

/*const requestHandler = (request, response) => {
    // response.writeHead(200, {'Content-type': 'text/html'});//так віддаємо хтмл
    // response.end('<h1>GOIT</h1>')
    if (request.url.indexOf('/home') >= 0) {//як приклад різної відповіді залежно від сторінки
        response.writeHead(200, {'Content-type': 'text/json'});//так віддаємо json
       return response.end(JSON.stringify({url: 'homepage', cont: 'homepage content'}))
    }
    response.writeHead(200, {'Content-type': 'text/json'});
    return response.end(JSON.stringify({url: 'other', cont: 'other content'}))

}*/

// ІІ щоб віддавати зміст файлу:
/*const fs = require('fs');

const manifest = fs.readFileSync('./package.json', 'utf8');//оскільки на старті - читаємо файл,
// синхронний варіант - читаємо один раз при запуску додатку

const requestHandler = (request, response) => {

    response.writeHead(200, {'Content-type': 'text/json'});
    return response.end(manifest)
}*/

const fs = require('fs').promises;

//оскільки на старті - читаємо файл,


const requestHandler = async (request, response) => {
    const manifest = await fs.readFile('./package.json', 'utf8'); // синхронний варіант - читаємо
    // асинхронно
    response.writeHead(200, {'Content-type': 'text/json'});
    return response.end(manifest)
}

//1:09:00 - початок express


const server = http.createServer(requestHandler);

server.listen(PORT, (err) => {
    if (err) {
        console.log('server errorr', err);
    }
    console.log(`Server run on port ${PORT}`);
});
//more than 1021


//todo: спробувати: розмістити у корні хтмл файл, прочитати його через fs.readFile і його зміст помістити у відповідь
// відео 1.2 51:20