const express = require("express");
const fs = require("fs");
const path = require("path");

const pathFile = path.join(__dirname, "viewsCount.json");
const port = 3000;
const app = express();
// Счетчик просмотров
let viewsCount = {
    countMain: 0,
    countAbout: 0,
};
fs.writeFileSync(pathFile, JSON.stringify(viewsCount, null, 2));

app.get("/", (req, res) => {
    // Увеличиваем счетчик просмотров
    viewsCount.countMain++;
    // Сохраняем счетчик в файл
    fs.writeFileSync(pathFile, JSON.stringify(viewsCount, null, 2));
    // Выводим счетчик на страницу
    res.send(`<h1>Главная страница</h1> <span>Просмотров: ${viewsCount.countMain}</span> <br> <a href='/about'>Обо мне</a>`);

});

app.get("/about", (req, res) => {
    viewsCount.countAbout++;
    fs.writeFileSync(pathFile, JSON.stringify(viewsCount, null, 2));
    res.send(`<h1>Обо мне</h1> <span>Просмотров: ${viewsCount.countAbout}</span> <br> <a href='/'>Главная страница</a>`);
});

app.listen(port, () => { console.log("Server Start"); });