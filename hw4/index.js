const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const joi = require('joi');

const userShema = joi.object({
    firstName: joi.string().min(2).required(),
    secondName: joi.string().min(2).required(),
    age: joi.number().min(0).required(),
    city: joi.string().min(2)
})

let uniqueId = 1;

const userDbPath = path.join(__dirname, './user.json');

app.use(express.json());

app.get('/users', (req, res) => {
    const users = JSON.parse(fs.readFileSync(userDbPath));
    res.send({ users });
})

app.get('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(userDbPath));
    const findUser = users.find((user) => {
        return user.id === Number(req.params.id);
    })
    res.send({ user: findUser });
})

app.post('/users', (req, res) => {
    const resultValidation = userShema.validate(req.body);

    if (resultValidation.error) {
        return res.status(404).send({ error: resultValidation.error.details });
    }

    uniqueId++;
    const users = JSON.parse(fs.readFileSync(userDbPath));
    users.push({ id: uniqueId, ...req.body });
    fs.writeFileSync(userDbPath, JSON.stringify(users));
    res.send({ id: uniqueId });

})

app.put('/users/:id', (req, res) => {
    const resultValidation = userShema.validate(req.body);

    if (resultValidation.error) {
        return res.status(404).send({ error: resultValidation.error.details });
    }

    const users = JSON.parse(fs.readFileSync(userDbPath));
    const findUser = users.find((user) => {
        return user.id === Number(req.params.id);
    })
    if (findUser) {
        findUser.firstName = req.body.firstName;
        findUser.secondName = req.body.secondName;
        findUser.age = req.body.age;
        findUser.city = req.body.city;
        fs.writeFileSync(userDbPath, JSON.stringify(users));
        res.send({ user: findUser });
    } else {
        res.send({ user: null });
    }
})

app.delete('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(userDbPath));
    const findUser = users.findIndex((user) => {
        return user.id === Number(req.params.id);
    })
    users.splice(findUser, 1);
    fs.writeFileSync(userDbPath, JSON.stringify(users));
    res.send({ id: req.params.id });
})







app.listen(3000);