const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// user name: rhsiam999_db_user pass:juak22KUqle8y51x

  const uri = "mongodb+srv://rhsiam999_db_user:juak22KUqle8y51x@cluster01.4eony5i.mongodb.net/?appName=Cluster01";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});



async function run() {
  try {
    await client.connect();

    const database = client.db("usersdb");
    const usersCollection = database.collection("users");


    app.get("/users", async(req, res) => {
      const cursor = usersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })


    app.post("/users", async(req, res) => {
      console.log("data in the server", req.body);
      const newUser = req.body;
      const result = await usersCollection.insertOne(newUser);
      res.send(result);

    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

  }
} 
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("Simple crud server");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
