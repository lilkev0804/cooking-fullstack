const router = require("express").Router();
const fs = require('fs')
const Recipes = require("../model/Recipes");

router.post("/ajouter", async (req, res) => {
  const recipe = new Recipes({
    type: req.body.type,
    personne : req.body.personne,
    proprietaire: req.body.proprietaire,
    title: req.body.title,
    pictureName: req.body.pictureName,
    timing: req.body.timing + " h " ,
    timingFormat: req.body.timingFormat + " min",
    difficulty: req.body.difficulty,
    prix: req.body.prix,
    ingredients: req.body.ingredient,
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
    console.log(err)
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
      `../client/public/images/recettes/${namePhoto}`,
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
router.put("/modified/:id", (req, res) => {
  Recipes.findById(req.params.id , function (err, recipes) {
    if (err) {
      res.send(err);
    }else{
      recipes.type= req.body.type,
      recipes.personne = req.body.personne, 
      recipes.proprietaire= req.body.proprietaire,
      recipes.title= req.body.title
      recipes.pictureName= req.body.pictureName,
      recipes.timing= req.body.timing + " h ",
      recipes.timingFormat= req.body.timingFormat + " min",
      recipes.difficulty= req.body.difficulty,
      recipes.prix= req.body.prix,
      recipes.ingredients= req.body.ingredients,
      recipes.preparationTime= req.body.preparationTime,
      recipes.preparationTimeFormat= req.body.preparationTimeFormat,
      recipes.reposTime= req.body.reposTime,
      recipes.reposTimeFormat= req.body.reposTimeFormat,
      recipes.cuissonTime= req.body.cuissonTime,
      recipes.cuissonTimeFormat= req.body.cuissonTimeFormat,
      recipes.etapes= req.body.etapes,
        recipes.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json( "Bravo, mise à jour des données OK" );
      });
    }
  });
});
module.exports = router;
