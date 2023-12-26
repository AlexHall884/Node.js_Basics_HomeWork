const express = require('express');
const joi = require('joi');
const fs = require("fs");
const path = require("path");

const port = 3000;
const pathFile = path.join(__dirname, "users.json");

const app = express();

const userShema = joi.object({
    firstName: joi.string().min(3).required(),
    lastName: joi.string().min(3).required(),
    age: joi.number().min(0).required(),
    city: joi.string().min(2)
});
app.use(express.json());

const users = [];

let uId = 0;

app.get('/users', (req, res) => {
    const usersFile = fs.readFileSync(pathFile, 'utf8');
    const users = JSON.parse(usersFile);
    res.send({ users });
});

app.get('/users/:id', (req, res) => {
    const usersFile = fs.readFileSync(pathFile, 'utf8');
    const users = JSON.parse(usersFile);
    const user = users.find((user) => user.id === +req.params.id);
    if (user) {
        res.send({ user });
    } else {
        res.status(404);
        res.send({ user: null });
    }
});

app.post('/users', (req, res) => {
    const result = userShema.validate(req.body);
    if (result.error) {
        return res
            .status(500)
            .send({ error: result.error.details })
    }

    uId += 1;
    users.push({
        id: uId,
        ...req.body,
    });

    // Записываем пользователей в файл
    fs.writeFile(pathFile, JSON.stringify(users), (err) => {
        if (err) {
            console.error(err);
        }
    });

    res.send({ id: uId });
});

app.put('/users/:id', (req, res) => {
    const usersFile = fs.readFileSync(pathFile, 'utf8');
    const users = JSON.parse(usersFile);
    const user = users.find((user) => user.id === +req.params.id);
    if (user) {
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.age = req.body.age;
        user.city = req.body.city;

        // Читаем и записываем пользователей в файл после изменений
        fs.writeFile(pathFile, JSON.stringify(users), (err) => {
            if (err) {
                console.error(err);
            }
        });

        res.send({ user });
    } else {
        res.status(404);
        res.send({ user: null });
    }
});

app.delete('/users/:id', (req, res) => {
    const usersFile = fs.readFileSync(pathFile, 'utf8');
    const users = JSON.parse(usersFile);
    const user = users.find((user) => user.id === +req.params.id);
    if (user) {
        const userIndex = users.indexOf(user);
        users.splice(userIndex, 1);

        // Читаем и записываем пользователей в файл после удаления
        fs.writeFile(pathFile, JSON.stringify(users), (err) => {
            if (err) {
                console.error(err);
            }
        });

        res.send({ user });
    } else {
        res.status(404);
        res.send({ user: null });
    }
});



app.listen(port, () => { console.log('Server Start!'); });