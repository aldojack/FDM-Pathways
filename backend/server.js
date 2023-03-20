require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PWD}@cluster0.cuw5ckt.mongodb.net/?retryWrites=true&w=majority`;
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from express");
});

app.post("/register", async (req, res) => {
  const client = new MongoClient(uri);
  const { firstName, lastName, email, password } = req.body;

  try {
    await client.connect();
    const db = client.db("FDM");
    const users = db.collection("Users");

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(409).send("Email already exists, please login");
    }

    const generateUserId = uuidv4();
    const sanitizedFirstName = firstName.toLowerCase();
    const sanitizedLastName = lastName.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);
    const sanitizedEmail = email.toLowerCase();

    const data = {
      userId: generateUserId,
      firstName: sanitizedFirstName,
      lastName: sanitizedLastName,
      email: sanitizedEmail,
      password: hashedPassword,
      highScores: {
        game2048: 0,
        pairs: 0,
        blackout: 0,
      },
      suggestedCareerPath: 'Pending'
    };
    const newUser = await users.insertOne(data);
    //Sign up for secret key
    const token = jwt.sign(newUser, sanitizedEmail, {
      expiresIn: 60 * 24,
    });
    // res.status(201).json({token, userId: generateUserId, email: sanitizedEmail})
    res.status(201).json({ token, userId: generateUserId });
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;

  try {
    await client.connect();
    const db = client.db("FDM");
    const users = db.collection("Users");

    const user = await users.findOne({ email });
    const correctPassword = await bcrypt.compare(password, user.password);

    if (user && correctPassword) {
      const token = jwt.sign(user, email, {
        expiresIn: 60 * 24,
      });
      res.status(201).json({ token, userId: user.userId });
    } else res.status(400).json("Invalid Credentials");
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

app.get("/user", async (req, res) => {
  const client = new MongoClient(uri);
  const { userId } = req.query;
  try {
    await client.connect();
    const database = client.db("FDM");
    const users = database.collection("Users");
    const query = { userId: userId };
    const user = await users.findOne(query);
    res.send(user);
  } finally {
    await client.close();
  }
});

const softwareTestingStream = {
  game2048: 0.8,
  pairs: 1,
  blackout: 0.3,
};

const businessIntelligenceStream = { 
  game2048: 0.5,
  pairs: 1.5,
  blackout: 0.3,
};

const technicalOperationStream = {
  game2048: 0.2,
  pairs: 0.4,
  blackout: 0.7,
};

function calculateWeightedScore(gameScores, weights) {
  const totalWeight = Object.values(weights).reduce((acc, weight) => acc + weight, 0);
  const weightedScores = Object.keys(gameScores).map((game) => gameScores[game] * weights[game]);
  const weightedAverage = weightedScores.reduce((acc, score) => acc + score, 0) / totalWeight;
  return weightedAverage;
}

function suggestStream(gameScores){
  
      // Calculate the weighted average score for each career path
      const softwareTestingScore = calculateWeightedScore(gameScores, softwareTestingStream);
      const businessIntelligenceScore = calculateWeightedScore(gameScores, businessIntelligenceStream);
      const technicalOperationScore = calculateWeightedScore(gameScores, technicalOperationStream);

         // Determine which career path has the highest score
    let suggestedCareerPath;
    if (softwareTestingScore >= businessIntelligenceScore && softwareTestingScore >= technicalOperationScore) {
      suggestedCareerPath = 'Software Testing';
    } else if (businessIntelligenceScore >= softwareTestingScore && businessIntelligenceScore >= technicalOperationScore) {
      suggestedCareerPath = 'Business Intelligence';
    } else {
      suggestedCareerPath = 'Technical Operations';
    }
    return suggestedCareerPath;
}

app.put("/user/game/score", async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, gameName, score } = req.body;

  try {
    const db = client.db("FDM");
    const users = db.collection("Users");
    const user = await users.findOne({ userId });
    const {game2048, pairs, blackout} = user.highScores
    const gameScores = {
      game2048: gameName === 'game2048' ? score : game2048,
      pairs: gameName === 'pairs' ? score : pairs,
      blackout: gameName === 'blackout' ? score : blackout
    }
    const allGamesPlayed = Object.values(gameScores).every(num => num > 0)
    // let newSuggestedStream;
    // if(allGamesPlayed)
    // {
    //   newSuggestedStream = suggestStream(gameScores);
    // }
    await users.updateOne(
      { userId },
      { $set: {
          highScores: {
            ...user.highScores,
            [gameName]: score
          },
          suggestedCareerPath: allGamesPlayed ? suggestStream(gameScores) : 'Pending'
        }
      }
    );
    
    
    res.send("Score updated successfully!");
  } catch (err) {
    res.status(500).send(err);
  } finally {
    await client.close();
  }
});

app.get("/users", async (req, res) => {
  //Once signed in then display users details
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("FDM");
    const users = db.collection("Users");

    const returnedUsers = await users.find().toArray();
    res.send(returnedUsers);
  } finally {
    await client.close();
  }
});

app.get("/games", async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("FDM");
    const games = db.collection("Games");

    const allGames = await games.find().toArray();
    res.send(allGames);
  } finally {
    await client.close();
  }
});

app.get("/game", async (req, res) => {
  const client = new MongoClient(uri);
  const gameName = req.query.gameName;
  try {
    await client.connect();
    const database = client.db("FDM");
    const games = database.collection("Games");

    const query = { name: gameName };
    const game = await games.findOne(query);
    res.send(game);
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
