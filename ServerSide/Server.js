const express = require('express');
const bodyParser = require('body-parser')
const cors =require ('cors')
const User =require ('./routes/users.js');
const mongoose = require("mongoose");
const UserSchema = require('./models/UserSchema.js');
const app = express();

const PORT =process.env.PORT || 5000;

const CONNECTION_URL = 'mongodb+srv://gnnstocks:gnnnstocks@gnnstockbase.dpw5b.mongodb.net/gnnstockbase?retryWrites=true&w=majority';
mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(` mongodb Connected bro and that shit Server Running on Port: http://localhost:${PORT}/api/users`)))
  .catch((error) => console.log(`${error} did not connect`));
  app.use(cors());
  app.use(bodyParser.json()) // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true }))
app.use("/api/users", User);
// app.use("/api/personal",userPersonal)
