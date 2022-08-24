const router = require("express").Router();
const RecipeModel = require("../models/Recipe.model")

/* GET home page */
router.get("/", (req, res, next) => {
  RecipeModel.find().then((data) => {
    let recipes = data
      .map(({ name, imagePath, _id: id }) => ({ name, imagePath, id }))
    res.render("index", { recipes });

  })


});

module.exports = router;
