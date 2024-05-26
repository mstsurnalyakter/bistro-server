const express = require('express');
require("dotenv").config();
const cors = require('cors');
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();

//middleware
app.use(cors());
app.use(express.json())


//menu
//bistroDB2

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jimwvxl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

 const menuCollection = client.db("bistroDB2").collection("menu");


 //menu related api
 app.get("/menu", async(req,res)=>{
  const result = await menuCollection.find().toArray();
  res.send(result)
 })



    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);











app.get("/",(req,res)=>{
    res.send("Bistro Boss Server.")
})

app.listen(port,()=>{
    console.log(`Server is running at : http://localhost:${port}`);
})