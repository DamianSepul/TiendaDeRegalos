const express = require('express');
const router = express.Router();
const mysqlConnection = require("../conexionDB");
module.exports = router;


router.get("/SelectProducto",(req,res)=>{
    mysqlConnection.query("SELECT * FROM productos",(err,rows,fields )=>{
        if(!err){
            res.json(rows);
        }else{
            res.json({
                mensaje:"Error al mostrar los productos"
            });
        }
    });
});