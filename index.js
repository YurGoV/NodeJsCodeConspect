const http = require('http')
const fs = require("fs");


const PORT = 8081;

const requestHandler = async (req, res) => {
    const manifest = await fs.readFile('./package.json', 'utf-8');
    res.writeHead(200, {'Content-type': 'text/json'});
    return res.end(manifest)
}

const server = http.createServer(requestHandler);

server.listen(PORT, (err) => {
    if (err) {
        console.error('Error at server launch', err);
    }
    console.log(`Server works at port ${PORT}`);
});

