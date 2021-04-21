const router = require("express").Router();
const User = require("../model/Users");

router.get("/:id", (req, res) => {
  User.findById(req.params.id, function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
});
router.get("/search/:name", (req, res) => {
  User.find({ name: req.params.name }, function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
});

router.put("/:id", (req, res) => {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      res.send(err);
    }
    user.avatar = req.body.avatar;
    user.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: "Bravo, mise à jour des données OK" });
    });
  });
});
router.delete("/:id", (req, res) => {});

module.exports = router;
