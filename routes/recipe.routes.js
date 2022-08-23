const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const mongoose = require("mongoose");

const router = require("express").Router();
const RecipeModel = require("../models/Recipe.model");

router.get("/add", isLoggedIn, (req, res) => {
    res.render("recipe/add");

});

router.post("/add", isLoggedIn, (req, res) => {
    const username = req.session.user.username
    const { name, origin, numServings, calorie, cookTimeMinutes, ingredients, instructions } = req.body;

    RecipeModel.create({ name, origin, numServings, calorie, cookTimeMinutes, instructions, ingredients, username })
        .then(() => res.render("recipe/add"))
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                return res
                    .status(400)
                    .render("recipe/add", { errorMessage: "Input validation failed, please check" });
            }
        })


});
router.get("/:id", isLoggedIn, (req, res) => {
    const id = req.params.id;
    RecipeModel.find({ _id: id }).then(([data]) => {
        let { name, origin, numServings, calorie, ingredients, instructions, cookTimeMinutes, _id: id } = data;
        res.render('recipe/detail', { name, origin, numServings, calorie, ingredients, instructions, cookTimeMinutes, id });
    })
});

router.get("delete/:id", isLoggedIn, (req, res) => {
    const id = req.params.id;
    const username = req.session.user.username;
    RecipeModel.deleteOne({ _id: id })
        .then(() => {
            res.redirect("/user/$(username");

        })


});
router.get("/update/:id", isLoggedIn, (req, res) => {
    const id = req.params.id;
    RecipeModel.findOne({ _id: id })
        .then((data) => {
            const { _id: id, name, origin, numServings, calorie, cookTimeMinutes, instructions, ingredients, username } = data;
            res.render("recipe/update", { id, name, origin, numServings, calorie, cookTimeMinutes, instructions, ingredients, username });
        })

});
function validationFormInput(body) {
    const inputFields = ['name', 'origin', 'numServings', 'calorie', 'cookTimeMinutes', 'instructions', 'ingredients'];
    const errors = [];
    for (let inputField of inputFields) {
        let inputvalue = body[inputField];
        if (!inputvalue) {
            errors.push(inputField);

        }
    }
    return errors;
}

module.exports = router;