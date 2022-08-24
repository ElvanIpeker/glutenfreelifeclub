const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

const router = require("express").Router();
const UserModel = require("../models/User.model");
const RecipeModel = require("../models/Recipe.model");

router.get("/:username", isLoggedIn, (req, res) => {
    const { username } = req.params;
    UserModel.findOne({ username }).then((user) => {
        const { username, password } = user;
        RecipeModel.find({ username }).then((data) => {
            let recipes = data
                .map(({ name, imagePath, _id: id }) => ({ name, imagePath, id }))
            res.render(`user`, { username, password, recipes });

        })
    })
});



module.exports = router;