const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster01.4eony5i.mongodb.net/?appName=Cluster01`;

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const gadgetCollection = client.db("gadgetDB").collection("gadgets");

    app.get("/gadgets", async (req, res) => {
      const cursor = gadgetCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/gadgets", async (req, res) => {
      const newGadgets = req.body;
      const result = await gadgetCollection.insertOne(newGadgets);
      res.send(result);
    });

    app.get("/gadgets/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await gadgetCollection.findOne(query);
      res.send(result)
    });

    app.put("/gadgets/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedGadget = req.body;
      const updateDoc = {
        $set: updatedGadget,
      };

      const result = await gadgetCollection.updateOne(
        filter,
        updateDoc,
        options,
      );

      res.send(result);
    });


    app.delete("gadgets/:id", async(req, res) => {
          const id = req.params.id;
          const query = {_id: new ObjectId(id)};
          const result = await gadgetCollection.deleteOne(query);
          res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("gadget server is getting running");
});

app.listen(port, () => {
  console.log(`Gadget server is running on ${port}`);
});
