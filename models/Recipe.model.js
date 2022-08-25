const { Schema, model } = require("mongoose");
const recipeSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        origin: {
            type: String,
            required: true
        },
        numServings: {
            type: Number,
            required: true

        },
        calorie: {
            type: Number,
            required: true

        },
        cookTimeMinutes: {
            type: Number,
            required: true
        },
        instructions: {
            type: String,
            required: true
        },
        ingredients: {
            type: String,
            required: true
        },
        imagePath: {
            type: String,
            required: true
        }



    },
);
const Recipe = model("Recipe", recipeSchema);
module.exports = Recipe;