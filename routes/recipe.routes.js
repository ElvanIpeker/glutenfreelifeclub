const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const mongoose = require("mongoose");

const router = require("express").Router();
const RecipeModel = require("../models/Recipe.model");

router.get("/add", isLoggedIn, (req, res) => {
    res.render("recipe/add");

});

router.post("/add", isLoggedIn, (req, res) => {
    const { name, origin, numServings, calorie, cookTimeMinutes, ingredients, instructions } = req.body;

    RecipeModel.create({ name, origin, numServings, calorie, cookTimeMinutes, instructions, ingredients })
        .then(() => res.render("recipe/add"))


});


module.exports = router;