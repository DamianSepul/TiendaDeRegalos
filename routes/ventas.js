const axios = require('axios');
const express = require('express');
const request  = require('request');
const router = express.Router();
const path = require ("path");
const mysqlConnection = require("../conexionDB");
const { response } = require('express');
const { url } = require('inspector');
const { header } = require('express/lib/request');



router.post("/AgregarCarrito/:idCliente",(req,res)=>{
    const {idCliente}=req.params;
    const {idProducto,cantidad}=req.body;
    mysqlConnection.query(`
    INSERT INTO carrito (idCliente,idProducto,cantidad) VALUES ('${idCliente}','${idProducto}','${cantidad}')
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




module.exports=router;