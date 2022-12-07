require('dotenv').config();
const express = require('express');
const {MongoClient} = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PWD}@cluster0.cuw5ckt.mongodb.net/?retryWrites=true&w=majority`
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json())

app.get('/',(req,res) => {
    res.send("Hello from express");
})

app.post('/register',async (req,res) => {
    const client = new MongoClient(uri);
    const {firstName, lastName, email, password} = req.body;



    try{
        await client.connect();
        const db = client.db('FDM');
        const users = db.collection('Users');

        const existingUser = await users.findOne({email});

        if(existingUser){
            return res.status(409).send('Email already exists, please login');
        }

        const generateUserId = uuidv4();
        const sanitizedFirstName = firstName.toLowerCase();
        const sanitizedLastName = lastName.toLowerCase();
        const hashedPassword = await bcrypt.hash(password, 10);
        const sanitizedEmail = email.toLowerCase();

        const data = {
            user_id: generateUserId, 
            firstName: sanitizedFirstName,
            lastName: sanitizedLastName,
            email: sanitizedEmail, 
            password: hashedPassword
        }
        const newUser = await users.insertOne(data);
        //Sign up for secret key
        const token = jwt.sign(newUser, sanitizedEmail, {
            expiresIn: 60 *24,
        })
        // res.status(201).json({token, userId: generateUserId, email: sanitizedEmail})
        res.status(201).json({token, user_id: generateUserId})
    } catch(err){
        console.log(err);
    }
})

app.post('/login',async (req,res) => {
    const client = new MongoClient(uri);
    const {email, password} = req.body;

    try{
        await client.connect();
        const db = client.db('FDM');
        const users = db.collection('Users');

        const user = await users.findOne({email})
        const correctPassword = await bcrypt.compare(password, user.password);



        if(user && correctPassword){
            const token = jwt.sign(user, email, {
                expiresIn: 60 * 24
            })
            res.status(201).json({token, user_id: user.user_id})
        }
        else res.status(400).json('Invalid Credentials');
    } catch(err){
        console.log(err);
    } finally{
        await client.close();
    }
})

app.get('/users',async (req,res) => {
    //Once signed in then display users details
    const client = new MongoClient(uri);

    try{
        await client.connect();
        const db = client.db('FDM');
        const users = db.collection('Users');

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