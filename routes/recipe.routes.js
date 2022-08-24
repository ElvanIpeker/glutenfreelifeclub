const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const uploadMiddleware = require("../middleware/cloudinary");


const mongoose = require("mongoose");

const router = require("express").Router();
const RecipeModel = require("../models/Recipe.model");


router.get("/add", isLoggedIn, (req, res) => {
    res.render("recipe/add");

});

router.post("/add", isLoggedIn, uploadMiddleware.single("image"), (req, res) => {
    const imagePath = req.file.path;
    const username = req.session.user.username;
    const { name, origin, numServings, calorie, cookTimeMinutes, ingredients, instructions } = req.body;

    const errors = validateFormInput(req.body);
    if (errors.length > 0) {
        return res.status(400).render("recipe/add", {
            errorMessage: `please provide ${errors.join(",")}.`,
        });
    }

    RecipeModel.create({ name, origin, numServings, calorie, cookTimeMinutes, instructions, ingredients, imagePath, username })
        .then(() => res.render("recipe/add"))
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                console.log(error)
                return res
                    .status(400)
                    .render("recipe/add", { errorMessage: "Input validation failed, please check" });
            }
        })


});
router.get("/:id", isLoggedIn, (req, res) => {
    const id = req.params.id;
    RecipeModel.find({ _id: id }).then(([data]) => {
        let { name, origin, numServings, calorie, ingredients, instructions, cookTimeMinutes, imagepath, _id: id } = data;
        res.render(`recipe/detail`, { name, origin, numServings, calorie, ingredients, instructions, cookTimeMinutes, imagePath, id });
    })
});

router.get("delete/:id", isLoggedIn, (req, res) => {
    const id = req.params.id;
    const username = req.session.user.username;
    RecipeModel.deleteOne({ _id: id })
        .then(() => {
            res.redirect(`/user/${username}`);

        })


});
router.get("/update/:id", isLoggedIn, (req, res) => {
    const id = req.params.id;
    RecipeModel.findOne({ _id: id })
        .then((data) => {
            const { _id: id, name, origin, numServings, calorie, cookTimeMinutes, instructions, ingredients, imagePath, username } = data;
            res.render("recipe/update", { id, name, origin, numServings, calorie, cookTimeMinutes, instructions, ingredients, imagePath, username });
        })

});

router.post("/update/:id", isLoggedIn, uploadMiddleware.single("image"), (req, res) => {
    const id = req.params.id;
    const imagePath = req.file?.path || req.body.imagePath;
    console.log("update id: ", id);
    console.log(req.body);



    const { name, origin, numServings, calorie, cookTimeMinutes, instructions, ingredients, username } = req.body
    RecipeModel.updateOne({ _id: id }, { $set: { name, origin, numServings, calorie, cookTimeMinutes, instructions, ingredients, imagePath, username } })
        .then(() => {
            res.redirect(`/recipe/${id}`);
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