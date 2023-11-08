const express = require('express')
const path = require('path');

const bcrypt = require("bcrypt")
const saltRounds = 10

const { MongoClient } = require('mongodb');
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://nakorn:Cxmx8h998998@192.168.1.205:27017";
// Create a new client and connect to MongoDB
const client = new MongoClient(uri);

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

// sendFile will go here
app.get('/register', function (req, res) {
    res.sendFile(path.join(__dirname, '/html/register.html'));
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

// Login
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log("Username: " + username);
    console.log("Password: " + password);
    res.send("Data received");
});

// Register
app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log("Username: " + username);
    console.log("Password: " + password);
    // Encrypt password 
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            // Store hash in your password DB.
            const authenObj = {
                database: "stretcher",
                collection: "authen",
                user: `${username}`,
                password: `${hash}`,
            }
            insertUser(authenObj).catch(console.dir);
        });
    });
    res.send("Registered");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

async function insertUser(authenObj) {
    try {
        // Connect to the "insertDB" database and access its "haiku" collection
        const database = client.db(authenObj.database);
        const collection = database.collection(authenObj.collection);

        // Create a document to insert
        const doc = {
            user: `${authenObj.user}`,
            password: `${authenObj.password}`,
        }
        
        // Insert the defined document into the "haiku" collection
        const result = await collection.insertOne(doc);

        // Print the ID of the inserted document
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        // Close the MongoDB client connection
        await client.close();
    }
}