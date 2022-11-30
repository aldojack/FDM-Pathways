require('dotenv').config();
const express = require('express');
const {MongoClient} = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PWD}@cluster0.cuw5ckt.mongodb.net/?retryWrites=true&w=majority`
const app = express();
const port = 8000;

app.get('/',(req,res) => {
    res.send("Hello from express");
})

app.post('/signup',(req,res) => {
    //Still a work in process - need to create a form on  the front end to send data here then validate before sending the mongoDB
    res.send("Hello from login");
})

app.get('/account',async (req,res) => {
    //Once signed in then display users details
    const client = new MongoClient(uri);

    try{
        await client.connect();
        const db = client.db('FDM');
        const users = db.collection('users');

        const returnedUsers =  await users.find().toArray();
        res.send(returnedUsers);
    }
    finally{
        await client.close();
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})