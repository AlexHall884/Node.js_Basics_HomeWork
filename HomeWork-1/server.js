// Напишите HTTP сервер и реализуйте два обработчика, где:
// — По URL “/” будет возвращаться страница, на которой есть гиперссылка на вторую страницу по ссылке “/about”
// — А по URL “/about” будет возвращаться страница, на которой есть гиперссылка на первую страницу “/”
// — Также реализуйте обработку несуществующих роутов (404).
// — * На каждой странице реализуйте счетчик просмотров. Значение счетчика должно увеличиваться на единицу каждый раз, когда загружается страница.
const http = require('http');
const port = '3000';

let countHome = 0;
let countAbout = 0;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        countHome++;
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(`<h1>Главная страница</h1> <br> <a href="/about">Обо мне</a> <br> <span id="count-home">${countHome}</span>`);
    } else if (req.url === '/about') {
        countAbout++;
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(`<h1>Обо мне</h1> <br> <a href="/">Главная страница</a> <br> <span id="count-about">${countAbout}</span>`);
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end('<h1>404 Not Found</h1> <br> <a href="/">Главная страница</a>');
    }
    console.log('Сервер запущен на http://localhost:3000/');
});

server.listen(port);