const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
require("dotenv").config();
const ventaSchema = require("./routes/sales");
const usuarioSchema = require("./routes/usuarios");

const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', ventaSchema);
app.use('/api/twty/a', ventaSchema);
app.use('/api/id', ventaSchema);
app.use('/api/cou', ventaSchema);
app.use('/api/pm', ventaSchema);
app.use('/api', usuarioSchema);
app.use('/api/n', usuarioSchema);
app.use('/api/id', usuarioSchema);
app.use('/api/mail', usuarioSchema);

// routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
    //res.send("Wcm");
});

// db conn
mongoose
.connect("mongodb+srv://marianorzsr:12345@cluster0.inkaeud.mongodb.net/sample_supplies?retryWrites=true&w=majority")
.then(() => console.log("Conexion a DB exitosa"))
.catch((error) => console.error(error));

app.listen(port, '0.0.0.0', () => {
    console.log(`Escuchando en http://0.0.0.0:${port}/`);
  });