const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
require('dotenv').config()


const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    //useCreatendex: true, 
   //useFindAndModify: false, 
   useNewUrlParser: true, 
   useUnifiedTopology: true 
});

const connection = mongoose.connection
connection.once("open", () => {
  console.log('MongoDB Connection Success!!!')
});

const recipeRouter = require("./routes/recipes.js");

app.use("/recipe",recipeRouter);

app.listen(PORT, () => {
    console.log(`Server is up and running at port ${PORT}`)
})
