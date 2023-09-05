const express = require("express");
const userSchema = require("../models/user");
const router = express.Router();

// crear usuario
router.post("/users", (req, res) => {
    const user = userSchema(req.body);
    user.save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
    //res.send("create user");
});
// obtener todos los usuario
router.get("/users", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    Promise.all([
        userSchema.find().skip(skip).limit(limit).exec(),
        userSchema.countDocuments().exec()
    ])
    .then(([users, totalCount]) => {
        const totalPages = Math.ceil(totalCount / limit);
        res.json({ users, totalCount, totalPages });
    })
    .catch((error) => {
        res.json({ message: error });
    });
});

 // obtener usuario por nombre
 router.get("/users/n/:name", (req, res) => {
    const { name } = req.params;
    userSchema
      .find({ name: name })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });

// obtener usuario por nombre
router.get("/users/:name", (req, res) => {
    const { name } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    Promise.all([
        userSchema.find({name: name}).skip(skip).limit(limit).exec(),
        userSchema.countDocuments().exec()
    ])
    .then(([users, totalCount]) => {
        const totalPages = Math.ceil(totalCount / limit);
        res.json({ users, totalCount, totalPages });
    })
    .catch((error) => {
        res.json({ message: error });
    });
});

// obtener usuario por id
 router.get("/users/id/:id", (req, res) => {
    const { id } = req.params;
    userSchema
      .find({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });
 // actualizar usuario especifico
 router.put("/users/:id", (req, res) => {
    const { id } =req.params;
    const { name, age, email } = req.body;
    userSchema
    .updateOne({ _id: id }, { $set: { name, age, email } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
 });

 // eliminar usuario especifico
 router.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    userSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
 });
module.exports = router;
 