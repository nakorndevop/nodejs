const express = require('express')
const path = require('path');

const app = express()
const port = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Respond with Redirection messages
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// sendFile will go here
app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, '/html/login.html'));
});

app.get('/form', function (req, res) {
    res.sendFile(path.join(__dirname, '/html/form.html'));
});

app.get('/css/style.css', function (req, res) {
    res.sendFile(path.join(__dirname, '/css/style.css'));
});

// Respond to POST request
app.post('/form', (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    console.log("Name: " + name);
    console.log("Surname: " + surname);
    res.send('Got a Form')
})

// Getting Form DATA
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log("Username: " + username);
    console.log("Password: " + password);
    res.send("Data received");
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})