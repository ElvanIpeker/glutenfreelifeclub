const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

const router = require("express").Router();
const UserModel = require("../models/User.model");
const RecipeModel = require("../models/Recipe.model");

router.get("/:username", isLoggedIn, (req, res) => {
    const { username } = req.params;
    console.log(req.user)

    UserModel.findOne({ username }).then((user) => {
        const { username, password } = user;
        RecipeModel.find({ username }).then((data) => {
            let owner = req.user.username === username





            let recipes = data
                .map(({ name, imagePath, _id: id }) => ({ name, imagePath, id }))
            res.render(`user`, { username, password, recipes, owner });

        })
    })
});



module.exports = router;