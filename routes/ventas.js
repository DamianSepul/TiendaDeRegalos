const axios = require('axios');
const express = require('express');
const request  = require('request');
const router = express.Router();
const path = require ("path");
const mysqlConnection = require("../conexionDB");
const { response } = require('express');
const { url } = require('inspector');
const { header } = require('express/lib/request');



router.post("/AgregarCarrito/:idProducto",(req,res)=>{
    const {idProducto}=req.params;
    mysqlConnection.query(`
    INSERT INTO carrito (idCliente,idProducto,cantidad) VALUES ('1','${idProducto}','1')
    `,(err,rows,fields )=>{
        if(!err){
            res.json(rows);
        }else{
            res.json({
                mensaje:"Error al mostrar los productos"
            });
        }
    });
});

router.post("/QuitarCantidad/:idCliente",(req,res)=>{
    const {idCliente}=req.params;
    const {cantidad}=req.body;
    mysqlConnection.query(`
    UPDATE carrito SET cantidad=cantidad-${cantidad} WHERE idCliente = ${idCliente};     
    `,(err,rows,fields )=>{
        if(!err){
            res.json(rows);
        }else{
            res.json({
                mensaje:"Error al mostrar los productos"
            });
        }
    });
});

router.post("/QuitarProducto/:idCliente",(req,res)=>{
    const {idCliente}=req.params;
    mysqlConnection.query(`
    DELETE FROM carrito WHERE idCliente=${idCliente};     
    `,(err,rows,fields )=>{
        if(!err){
            res.json(rows);
        }else{
            res.json({
                mensaje:"Error al mostrar los productos"
            });
        }
    });
});

router.post("/AgregarEnvioHotel/:idVenta",(req,res)=>{
    const {idVenta}=req.params;
    const {nHabitacion,nombreDest, fechaEnvio,horaEnvio}=req.body;
    mysqlConnection.query(`
    INSERT INTO envioshotel (nHabitacion, nombreDest, fechaEnvio, horaEnvio, idVenta) VALUES ('${nHabitacion}','${nombreDest}','${fechaEnvio}','${horaEnvio}','${idVenta}')   
    `,(err,rows,fields )=>{
        if(!err){
            res.json(rows);
        }else{
            res.json({
                mensaje:"Error al mostrar los productos"
            });
        }
    });
});

router.get("/", (req, res) => {
    mysqlConnection.query("SELECT * FROM venta", (err, rows, fields) => {
        if (!err) {
            res.json(rows)
        } else {
            res.json({
                mensaje: "Error al mostrar los productos"
            });
        }
    });
});



module.exports=router;