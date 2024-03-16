// Напишите HTTP сервер и реализуйте два обработчика, где:
// — По URL “/” будет возвращаться страница, на которой есть гиперссылка на вторую страницу по ссылке “/about”
// — А по URL “/about” будет возвращаться страница, на которой есть гиперссылка на первую страницу “/”
// — Также реализуйте обработку несуществующих роутов(404).
// — * На каждой странице реализуйте счетчик просмотров.Значение счетчика должно увеличиваться на единицу каждый раз, когда загружается страница.

const http = require('http');
let countBase = 0;
let countAbout = 0;

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        countBase++;
        res.writeHead(200, {
            "Content-Type": "text/html; charset=UTF-8"
        })
        res.end(`<h1>Главная страница </h1> 
         <a href="/about">ссылка на страницу About</a>
         <p>Просмотров: ${countBase}</p>
        `)

    } else if (req.url === "/about") {
        countAbout++;
        res.writeHead(200, {
            "Content-Type": "text/html; charset=UTF-8"
        })
        res.end(`<h1>Страница about</h1>
        <a href="/">ссылка на страницу / </a>
        <p>Просмотров: ${countAbout}</p>
        `)
    }
    else {
        res.writeHead(404, {
            'Content-Type': 'text/html; charset=UTF-8'
        });
        res.end(
            `<h1>Ошибка 404</h1>
         <p>Страница не существует</p>
         `
        );
    }
})

server.listen(3000);