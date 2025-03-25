const express = require("express");
const app = express();
const port = 7000;
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { SendGoodNewsEmail, SendEmail } = require("./utils");

app.use(cors());
app.use(express.json());

console.log(process.env.DB_USER);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pdvgnv8.mongodb.net/?retryWrites=true&w=majority`;

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
    // Database
    const Currency = client.db("BrightonFx").collection("Currencies");
    const Orders = client.db("BrightonFx").collection("Orders");
    const Upsell = client.db("BrightonFx").collection("Upselling");
    const Users = client.db("BrightonFx").collection("Users");

  
    app.get("/currency", async (req, res) => {
      const result = await Currency.find().sort({ Number: 1 }).toArray();
      res.send(result);
    });

    app.get("/singleCurrency/:currency", async (req, res) => {
      const currencyName = req.params.currency;
      const query = {
        value: currencyName,
      };
      const result = await Currency.findOne(query);
      res.send(result);
    });

    app.put("/updateCurrency/:currency", async (req, res) => {
      const currencyName = req.params.currency;
      const query = { value: currencyName };
      const body = req.body;
      const updateDoc = {
        $set: {
          value: body.value,
          label: body.label,
          Buy: body.Buy,
          Sell: body.Sell,
        },
      };
      const result = await Currency.updateOne(query, updateDoc);
      res.send(result);
    });

    app.post("/Order", async (req, res) => {
      const body = req.body;
      const result = await Orders.insertOne(body);
      const email = await SendEmail(req);
      console.log(email)
      res.send(result);
    });

    app.get("/upsell", async (req, res) => {
      const result = await Upsell.findOne();
      res.send(result);
    });

    app.get("/upsellUpdate/:newPercentage", async (req, res) => {
      const Upselling = req.params.newPercentage;

      const updateDoc = {
        $set: {
          Upsell: Upselling,
        },
      };
      const result = await Upsell.updateOne({}, updateDoc);
      res.send(result);
    });

    app.post("/AddCurrency", async (req, res) => {
      const body = req.body;
      const query = {
        value: body.value,
      };

      const findData = await Currency.find(query).toArray();

      if (findData.length) {
        return res.send({ message: "Already added" });
      }

      const result = await Currency.insertOne(body);
      res.send(result);
    });

    app.get("/PendingOrder", async (req, res) => {
      const query = {
        Status: "Pending",
      };
      const result = await Orders.find(query).toArray();
      res.send(result);
    });

    app.get("/pendingToAceept/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const updateDoc = {
        $set: {
          Status: "Accepted",
        },
      };
      const result = await Orders.updateOne(query, updateDoc);
      const find = await Orders.findOne(query);
      const email = await SendGoodNewsEmail(find);
      res.send(result);
    });
    app.get("/AcceptedOrder", async (req, res) => {
      const query = {
        Status: "Accepted",
      };
      const result = await Orders.find(query).toArray();
      res.send(result);
    });

    app.get("/details/:Id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.Id) };
      const result = await Orders.findOne(query);
      res.send(result);
    });

    app.put("/UpdateCurrencyPrice/:currency", async (req, res) => {
      const SelectedCurreny = req.params.currency;
      const body = req.body;
      const Rate = body.Rate;
      const option = { upsert: true };
      const query = { value: SelectedCurreny };
      const updateDoc = {
        $set: {
          Rate: Rate,
        },
      };
      const result = await Currency.updateOne(query, updateDoc, option);
      res.send(result);
    });

    app.post("/user", async (req, res) => {
      const email = req.body.email;
      const body = req.body;
      const findtheData = await Users.find({ email: email }).toArray();
      if (findtheData.length) {
        return res.send({ messege: "Already Added" });
      }
      const AddedData = await Users.insertOne(body);
      res.send(AddedData);
    });

    app.get("/admincheck/:email", async (req, res) => {
      const email = req.params.email;
      let admin = false;
      const findUser = await Users.findOne({ email: email });
      if (findUser?.role == "Admin") {
        admin = true;
      }
      res.send(admin);
    });

    app.get("/Updatefdf", async (req, res) => {
      const SelectedCurreny = req.params.currency;
      const body = req.body;
      const Rate = body.Rate;
      const option = { upsert: true };
      const query = { value: SelectedCurreny };
      const updateDoc = {
        $set: {
          Rate: 0.1,
        },
      };
      const result = await Currency.updateMany({}, updateDoc, option);
      res.send("done");
    });

    app.get("/allusers", async (req, res) => {
      const result = await Users.find().toArray();
      res.send(result);
    });

    app.put("/updateUser/:email", async (req, res) => {
      const query = { email: req.params.email };
      const updateDoc = {
        $set: {
          role: "Admin",
        },
      };
      const result = await Users.updateOne(query, updateDoc);
      res.send(result);
    });

    app.get("/completedOrder", async (req, res) => {
      const query = {
        Status: "Completed",
      };
      const result = await Orders.find(query).toArray();
      res.send(result);
    });

    app.put("/acceptedToCompleted/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const updateDoc = {
        $set: {
          Status: "Completed",
        },
      };
      const result = await Orders.updateOne(query, updateDoc);
      res.send(result);
    });

    app.delete("/deleteOrder/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const result = await Orders.deleteOne(query);
      res.send(result);
    });

    app.post('/sendmail',async(req,res)=>{
      const result = await SendEmail(req.body);
      res.send(result)
    })
    // app.get('/GetCurrent/:updateValue',async(req,res)=>{
    //   const Upsell = parseInt(req.params.updateValue)
    //   const updateDoc = {
    //     $set:{
    //       Upsell : Upsell
    //     }
    //   }
    //   const result = await Upsell.

    // })
    // Send a ping to confirm a successful connection
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
