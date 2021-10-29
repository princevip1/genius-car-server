const express = require("express");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
//prince3214
// ISGJ6jISlgkGG1Vs

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.va0ei.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("geniusCar");
    const servicesCollaction = database.collection("services");

    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = servicesCollaction.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = ObjectId(id);
      const result = await servicesCollaction.findOne(query);
      res.send(result);
    });

    app.post("/services", async (req, res) => {
      const service = req.body;
      const result = await servicesCollaction.insertOne(service);
      res.json(result);
    });

    app.delete("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await servicesCollaction.deleteOne(query);
      res.json(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server runing");
});

app.listen(port, () => {
  console.log("https://localhost:", port);
});
