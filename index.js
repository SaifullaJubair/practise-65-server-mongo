const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { get } = require('http');

const port = process.env.PORT || 5000;

// middle ware

app.use(cors())
app.use(express.json())



const uri = "mongodb+srv://module-65:pHdYVgMOaxRNNWrf@cluster0.1l4zbuv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
   try {
      const dataBase = client.db('selfPractice-65').collection('users');


      //first time to see can add a user data on database
      // const user = {
      //    name: 'jubair',
      //    email: 'js@gmail.com'
      // }
      // const result = await dataBase.insertOne(user)
      // console.log(result);

      app.get('/users', async (req, res) => {
         //database theke shob khuje anar jonno query = {} use kora holo
         const query = {}
         const cursor = dataBase.find(query)
         const users = await cursor.toArray();
         res.send(users)
      })

      app.post('/users', async (req, res) => {
         const user = req.body;
         console.log(user)
         const result = await dataBase.insertOne(user)
         res.send(result)
      })
   }
   finally { }
}
run().catch(err => console.log(err))


app.get('/', (req, res) => {
   res.send('Mongo practice')
})



app.listen(port, () => {
   console.log(`server running on port ${port}`)
})



