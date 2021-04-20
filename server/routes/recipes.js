const router = require("express").Router();
const fs = require('fs')
const Recipes = require("../model/Recipes");

router.post("/ajouter", async (req, res) => {
  const recipe = new Recipes({
    type: req.body.type,
    proprietaire: req.body.proprietaire,
    title: req.body.title,
    pictureName: req.body.pictureName,
    timing: req.body.timing,
    timingFormat: req.body.timingFormat,
    difficulty: req.body.difficulty,
    prix: req.body.prix,
    ingredients: req.body.ingredients,
    preparationTime: req.body.preparationTime,
    preparationTimeFormat: req.body.preparationTimeFormat,
    reposTime: req.body.reposTime,
    reposTimeFormat: req.body.reposTimeFormat,
    cuissonTime: req.body.cuissonTime,
    cuissonTimeFormat: req.body.cuissonTimeFormat,
    etapes: req.body.etapes,
  });
  try {
    const savedRecipes = await recipe.save();
    res.send(savedRecipes);
  } catch (err) {
    res.status(400).send();
  }
});
router.get("/", (req, res) => {
  Recipes.find(function (err, recipes) {
    if (err) {
      res.send(err);
    }
    res.json(recipes);
  });
});

router.delete("/:id/:name", (req, res) => {
  const namePhoto = req.params.name
  Recipes.remove({_id: req.params.id}, function(err, recipes){
    if (err){
        res.send(err); 
    }
    res.json({message:"Bravo, recette supprimée"}); 
    fs.unlink(
      `../client/public/images/${namePhoto}`,
      err => {
        if (err) {
          throw err
        }
        console.log('File is deleted.')
      }
    )
  }); 
});


router.get("/:id", (req, res) => {
  Recipes.findById(req.params.id, (err, recipes)  => {
    if (err) {
      res.send(err);
    }
    res.json(recipes);
  });
});

router.get("/type/:type", (req, res) => {
  Recipes.find({ type: req.params.type }, function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
});

router.get("/user/:name", (req, res) => {
  Recipes.find({ proprietaire: req.params.name }, function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
});

module.exports = router;
