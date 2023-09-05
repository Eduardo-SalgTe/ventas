const express = require("express");
const saleSchema = require("../models/venta");
const router = express.Router();

// obtener ventas
router.get("/ventas/vv/", (req, res) => {
  saleSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
router.post("/ventas", (req, res) => {
  const user = saleSchema(req.body);
  user.save()
  .then((data) => res.json(data))
  .catch((error) => res.json({ message: error}));
  //res.send("create user");
});

// obtener todas las ventas
router.get("/ventas", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  Promise.all([
    saleSchema.find().skip(skip).limit(limit).exec(),
    saleSchema.countDocuments().exec()
  ])
  .then(([venta, totalCount]) => {
      const totalPages = Math.ceil(totalCount / limit);
      res.json({ venta, totalCount, totalPages });
  })
  .catch((error) => {
      res.json({ message: error });
  });
});
// obtener todas las ventas
router.get("/ventas", (req, res) => {
    saleSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});


 // obtener venta por user_id
 router.get("/ventas/:user_id", (req, res) => {
    const { user_id } = req.params;
    saleSchema
      .find({ user_id: user_id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });

 // actualizar venta por id
 router.put("/ventas/:id", (req, res) => {
    const { id } =req.params;
    const { couponUsed, purchaseMethod } = req.body;
    saleSchema
    .updateOne({ _id: id }, { $set: { couponUsed, purchaseMethod } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
 });

 // eliminar venta por id
 router.delete("/ventas/:id", (req, res) => {
    const { id } = req.params;
    saleSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
 });
module.exports = router;
