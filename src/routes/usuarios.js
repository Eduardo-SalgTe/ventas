const express = require("express");
const usuarioSchema = require("../models/usuarios");
const router = express.Router();

// crear usuario
router.post("/usuarios", (req, res) => {
    const usuario = usuarioSchema(req.body);
    usuario.save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
    //res.send("create user");
});
// obtener todos los usuario
router.get("/usuarios", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    Promise.all([
        usuarioSchema.find().skip(skip).limit(limit).exec(),
        usuarioSchema.countDocuments().exec()
    ])
    .then(([usuario, totalCount]) => {
        const totalPages = Math.ceil(totalCount / limit);
        res.json({ usuario, totalCount, totalPages });
    })
    .catch((error) => {
        res.json({ message: error });
    });
});

 // obtener usuario por nombre
 router.get("/usuarios/n/:name", (req, res) => {
    const { name } = req.params;
    usuarioSchema
      .find({ name: name })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });

// obtener usuario por nombre
router.get("/usuarios/:name", (req, res) => {
    const { name } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    Promise.all([
        usuarioSchema.find({name: name}).skip(skip).limit(limit).exec(),
        usuarioSchema.countDocuments().exec()
    ])
    .then(([usuarios, totalCount]) => {
        const totalPages = Math.ceil(totalCount / limit);
        res.json({ usuarios, totalCount, totalPages });
    })
    .catch((error) => {
        res.json({ message: error });
    });
});

// obtener usuario por id
 router.get("/usuarios/id/:id", (req, res) => {
    const { id } = req.params;
    usuarioSchema
      .find({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });
  // obtener usuario por id
 router.get("/usuarios/mail/:email", (req, res) => {
    const { email } = req.params;
    usuarioSchema
      .find({ email: email })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });
 // actualizar usuario especifico
 router.put("/usuarios/:id", (req, res) => {
    const { id } =req.params;
    const { name, op, email, passw } = req.body;
    usuarioSchema
    .updateOne({ _id: id }, { $set: { name, op, email, passw } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
 });

 // eliminar usuario especifico
 router.delete("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    usuarioSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
 });
module.exports = router;
 