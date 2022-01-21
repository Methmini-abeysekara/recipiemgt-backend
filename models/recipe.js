const mongoose = require("mongoose");
 
const Schema = mongoose.Schema;

const recepieSchema = new Schema({

    Recipename : {
        type : String,
      // backend validation
        required: true
    },
    Ingredients : {
        type : String,
    //   backend validation
        required: true
    },
    Description : {
        type : String,
      // backend validation
        required: true
    }
    
})

const Recipe = mongoose.model("Recipe",recepieSchema);

module.exports = Recipe;