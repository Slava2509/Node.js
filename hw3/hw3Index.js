// Напишите HTTP сервер на express и реализуйте два обработчика “/” и “/about”, где:

// — На каждой странице реализован счетчик просмотров
// — Значение счетчика необходимо сохранять в файл каждый раз, когда обновляется страница
// — Также значение счетчика должно загружаться из файла, когда запускается обработчик страницы
// — Таким образом счетчик не должен обнуляться каждый раз, когда перезапускается сервер.

const express = require('express');
const app = express();

let countBase = 0;
let countAbout = 0;


countBase++
app.get('/', (req, res) => {
    countBase++;
    res.send(`<h1>Корневая страница</h1> <a href="/about">ссылка на страницу About</a>  <p>Просмотров: ${countBase}</p>`);
});

app.get('/about', (req, res) => {
    countAbout++;
    res.send(`<h1>Страница about</h1> <a href="/about">ссылка на главную страницу</a> <p>Просмотров: ${countAbout}</p>`);
});


app.listen(3000);