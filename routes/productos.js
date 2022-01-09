const axios = require('axios')
const express = require('express')
const request = require('request')
const router = express.Router()
const path = require("path")
const mysqlConnection = require("../conexionDB")
const { response } = require('express')
const { url } = require('inspector')
const { header } = require('express/lib/request')

const fs = require ('fs')
const multer = require('multer')
const { DATETIME } = require('mysql/lib/protocol/constants/types')
const upload = multer({dest: 'public/images/productos'})

router.get("/", (req, res) => {
    mysqlConnection.query("SELECT * FROM productos", (err, rows, fields) => {
        if (!err) {
            res.json(rows)
        } else {
            res.json({
                mensaje: "Error al mostrar los productos"
            });
        }
    });
});
let ImagePath = ''
router.post('/upload', upload.single('imagen'),(req,res) =>{
    ImagePath = req.file.path + '.' + req.file.mimetype.split('/')[1]
    fs.renameSync(req.file.path,ImagePath)
    //res.send(ImagePath)
})

router.put('/EditImagen/:id', (req, res) => {
    let id = req.params.id
    let sql = 'UPDATE Productos SET images = ? WHERE idProducto = ?'
    mysqlConnection.query(sql, [ImagePath, id], function (err, results) {
        if (err) {
            throw err
        } else {
            res.send(results)
        }
    })
})

/*router.get("/SelectoUnProducto:id"), (req, res) => {
    mysqlConnection.query("SELECT * FROM productos WHERE id = ?"), [req.params.id], (err, rows) => {
        if (err) {
            res.json({
                mensaje: "Error al mostrar los productos"
            });
        } else {
            res.json(rows)
        }
    }
}*/

router.post("/AgregarProducto", (req, res) => {
    let data = { nombre: req.body.nombre, descripcion: req.body.descripcion, precio: req.body.precio, stock: req.body.stock }
    let sql = "INSERT INTO productos SET ?"
    mysqlConnection.query(sql, data, function (err, result) {
        if (err) {
            throw err
        } else {
            Object.assign(data, { id: result.isertId })
            res.send(data)
        }
    })
})

router.put("/Editar/:id", (req, res) => {
    let id = req.params.id
    let nombre = req.body.nombre
    let descripcion = req.body.descripcion
    let precio = req.body.precio
    let stock = req.body.stock
    //let images = req.body.images
    let sql = "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE idProducto = ?"
    mysqlConnection.query(sql, [nombre, descripcion, precio, stock, id], function (err, results) {
        if (err) {
            throw err
        } else {
            res.send(results)
        }
    })
})

router.delete("/Borrar/:id", (req, res) => {
    const { id } = req.body;
    mysqlConnection.query("DELETE FROM productos WHERE idProducto = ?", [req.params.id], function (err, rows) {
        if (err) {
            throw err
        } else {
            res.send(rows)
        }
    })
})

module.exports = router;
