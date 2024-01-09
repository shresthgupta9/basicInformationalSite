const http = require('node:http');
const fs = require('node:fs');

const hostname = '127.0.0.1';
const port = 3000;

const show404page = (res) => {
    const path = "./404.html";

    fs.readFile(path, "utf-8", (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<h1>Error: 500</h1><p>Internal Server Error</p>');
        }
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
    });
};

const server = http.createServer((req, res) => {
    const link = new URL(req.url, `http://${req.headers.host}`);
    const pagename = (link.pathname === "/") ? "./index.html" : `.${link.pathname}.html`;

    fs.readFile(pagename, 'utf8', (err, data) => {
        if (err) {
            show404page(res);
            return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        return res.end(data);
    });

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});