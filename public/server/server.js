let express = require('express');
let fs = require('fs');
let app = express();
let PORT = 8080;

let users = require('./users.json');
let onlineUsers = require('./onlineUsers.json');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    res.header("Access-Control-Allow-Headers", "Content-Type, email, name, pass, phone, address");
    next();
});


app.get('/users', (req, res) => {
    res.send(users);
});

app.post('/getuser', (req, res) => {
    let isUserOnline = false;
    let userId = 0;
    let accessTrigger = false;
    isUserOnline = onlineUsers.some(user => user === req.headers.email);

    users.forEach((user, index) => {
        if (isUserOnline && (user.email === req.headers.email) && (user.pass === req.headers.pass)) {
            accessTrigger = true;
            userId = index;
        }
    });
    accessTrigger ? res.send(users[userId]) : res.status(400).send(res.statusText);
});

app.post('/login', (req, res) => {
    let accessTrigger = false;
    let isLoggedIn = false;
    let userId = 0;

    users.forEach((user, index) => {
        if (user.email === req.headers.email && user.pass === req.headers.pass) {
            accessTrigger = true;
            userId = index;
        }
    });

    if (accessTrigger) {
        if (onlineUsers.length > 0) {
            onlineUsers.forEach((user) => {
                if (user !== req.headers.email) {
                    onlineUsers.push(req.headers.email);
                    fs.writeFileSync('./onlineUsers.json', JSON.stringify(onlineUsers));
                    isLoggedIn = true;
                } else {
                    isLoggedIn = false;
                }
            });
        } else {
            onlineUsers.push(req.headers.email);
            fs.writeFileSync('./onlineUsers.json', JSON.stringify(onlineUsers));
            isLoggedIn = true;
        }
    }

    if (accessTrigger && isLoggedIn) {
        console.log(`User ${req.headers.email} logging in.`);
        res.send(users[userId]);
    } else {
        res.status(403).send(`Please check your login/password, something is incorrect, or user ${req.headers.email} doesn't exist.`);
    }
});

app.post('/logout', (req, res) => {
    onlineUsers.forEach((user, index) => {
        if (user === req.headers.email) {
            onlineUsers.splice(index, 1);
            if (onlineUsers.length <= 0) {
                fs.writeFileSync('./onlineUsers.json', '[]');
            } else fs.writeFileSync('./onlineUsers.json', onlineUsers);
            console.log(`User ${req.headers.email} logged out.`);
            res.send(`User ${req.headers.email} logged out.`);
        }
    });
});

app.post('/add', (req, res) => {
    let regTrigger = users.some(user => user.email === req.headers.email);

    if (!regTrigger) {
        let newUser = {
            email: req.headers.email,
            name: req.headers.name,
            pass: req.headers.pass,
            phone: '',
            address: ''
        };
        users.push(newUser);
        fs.writeFileSync('./users.json', JSON.stringify(users));
        res.send(newUser);
    } else res.status(400).send(`User ${req.headers.email} exists already.`);
});

app.post('/update', (req, res) => {
    let isOnline = onlineUsers.some(user => user === req.headers.email);
    if (isOnline) {
        for (let i = 0; i <= users.length; i++) {
            if (users[i].email === req.headers.email && users[i].pass === req.headers.pass) {
                let updatedUser = {
                    "email": req.headers.email,
                    "pass": req.headers.pass,
                    "name": req.headers.name,
                    "phone": req.headers.phone,
                    "address": req.headers.address
                };
                users.splice(i, 1, updatedUser);
                fs.writeFileSync('./users.json', JSON.stringify(users));
                res.send(updatedUser);
                break;
            }
        }
    } else res.status(400).send(res.statusText);
});

app.listen(PORT, () => console.log(`Server starts on port ${PORT}.`));