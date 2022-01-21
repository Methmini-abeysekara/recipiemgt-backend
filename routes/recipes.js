const router = require("express").Router();
let Recipe = require("../models/recipe");

router.route("/add").post((req,res) => {
    
    const Recipename = req.body.Recipename;
    const Ingredients = (req.body.Ingredients);
    const Description= req.body.Description;

    const newRecipe = new Recipe({
        Recipename,
        Ingredients,
        Description
    })


    newRecipe.save().then(() => {
        res.json("Recipe Added");
    }).catch((err) =>{
        console.log(err);
    })

})

// http://localhost:8075/student

router.route("/").get((req,res) => {

    Recipe.find().then((recipes) => {
        res.json(recipes)
    }).catch((err) =>{
        console.log(err);
    })

})


router.route("/update/:id").put(async (req,res) => {
    let userId = req.params.id;
    //destructure
    const {Recipename,Ingredients,Description} = req.body;

    const updateRecipe = {
        Recipename,
        Ingredients,
        Description
    }

    const update = await Recipe.findByIdAndUpdate(userId,updateRecipe).then(() => {
        res.status(200).send({status: "Recipe updated" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data"})
    })
})

router.route("/delete/:id").delete(async(req,res) => {
    let userId = req.params.id;

    await Recipe.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "Recipe deleted"})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete data",error : err.message})
    })

})

router.route("/get/:id").get(async (req,res) => {
    let userId = req.params.id;

    const user = await Recipe.findById(userId).then((recipe) => {
        res.status(200).send({status: "recipe fetched",recipe})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get recipe",error : err.message})
    })
    
})
module.exports = router;