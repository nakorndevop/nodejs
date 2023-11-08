const { MongoClient } = require('mongodb');
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://nakorn:Cxmx8h998998@192.168.1.205:27017";
// Create a new client and connect to MongoDB
const client = new MongoClient(uri);

const bcrypt = require("bcrypt")
const saltRounds = 10
const myPlaintextPassword = "HelloWorld"

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

bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
        const authenObj = {
            database: "stretcher",
            collection: "authen",
            user: "somchai",
            password: `${hash}`,
        }
        insertUser(authenObj).catch(console.dir);
    });
});