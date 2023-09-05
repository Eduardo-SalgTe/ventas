const express = require("express");
const ventaSchema = require("../models/sales");
const router = express.Router();

// obtener ventas
router.get("/sales", (req, res) => {
  ventaSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
router.post("/sales", (req, res) => {
  const nueva = ventaSchema(req.body);
  nueva.save()
  .then((data) => res.json(data))
  .catch((error) => res.json({ message: error}));
  //res.send("create user");
});

// obtener ventas por lugar
router.get("/sales/:place", (req, res) => {
  const { place } =req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  Promise.all([
    ventaSchema.find({ storeLocation: place}).skip(skip).limit(limit).exec(),
    ventaSchema.countDocuments().exec()
  ])
  .then(([vent, totalCount]) => {
      const totalPages = Math.ceil(totalCount / limit);
      res.json({ vent, totalCount, totalPages });
  })
  .catch((error) => {
      res.json({ message: error });
  });
});

// obtener ventas por id
router.get("/sales/id/:id", (req, res) => {
  const { id } =req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  Promise.all([
    ventaSchema.find({ _id: id}).skip(skip).limit(limit).exec(),
    ventaSchema.countDocuments().exec()
  ])
  .then(([vent, totalCount]) => {
      const totalPages = Math.ceil(totalCount / limit);
      res.json({ vent, totalCount, totalPages });
  })
  .catch((error) => {
      res.json({ message: error });
  });
});

// ventas general
router.get("/sales/twty/a", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  Promise.all([
    ventaSchema.find().skip(skip).limit(limit).exec(),
    ventaSchema.countDocuments().exec()
  ])
  .then(([vent, totalCount]) => {
      const totalPages = Math.ceil(totalCount / limit);
      res.json({ vent, totalCount, totalPages });
  })
  .catch((error) => {
      res.json({ message: error });
  });
});
// obtener ventas por coupon
router.get("/sales/cou/:co", (req, res) => {
  const { co } =req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  Promise.all([
    ventaSchema.find({ couponUsed: co}).skip(skip).limit(limit).exec(),
    ventaSchema.countDocuments().exec()
  ])
  .then(([vent, totalCount]) => {
      const totalPages = Math.ceil(totalCount / limit);
      res.json({ vent, totalCount, totalPages });
  })
  .catch((error) => {
      res.json({ message: error });
  });
});
// obtener ventas por metodo
router.get("/sales/pm/:mt", (req, res) => {
  const { mt } =req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  Promise.all([
    ventaSchema.find({ purchaseMethod: mt }).skip(skip).limit(limit).exec(),
    ventaSchema.countDocuments().exec()
  ])
  .then(([vent, totalCount]) => {
      const totalPages = Math.ceil(totalCount / limit);
      res.json({ vent, totalCount, totalPages });
  })
  .catch((error) => {
      res.json({ message: error });
  });
});
 // actualizar venta por id
 router.put("/sales/:id", (req, res) => {
    const { id } =req.params;
    const { couponUsed, purchaseMethod } = req.body;
    ventaSchema
    .updateOne({ _id: id }, { $set: { couponUsed, purchaseMethod } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
 });

 // eliminar venta por id
 router.delete("/sales/:id", (req, res) => {
    const { id } = req.params;
    ventaSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
 });
module.exports = router;
