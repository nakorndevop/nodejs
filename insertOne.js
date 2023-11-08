const { MongoClient } = require('mongodb');
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://nakorn:Cxmx8h998998@192.168.1.205:27017";
// Create a new client and connect to MongoDB
const client = new MongoClient(uri);
async function run() {
    try {
        // Connect to the "insertDB" database and access its "haiku" collection
        const database = client.db("stretcher");
        const collection = database.collection("authen");

        // Create a document to insert
        const doc = {
            user: "phuthirat",
            password: "12345",
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
// Run the function and handle any errors
run().catch(console.dir);
