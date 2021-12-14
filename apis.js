/*
    ################################################
    Documento donde se alojaran las apis, aqui se 
    vera como se realizan querys para que las apis
    se comuniquen con una base de datos.
    #################################################
*/

const express = require('express');
const router = express.Router();
const path = require ("path");


//Cuando se solicita la carpeta raiz se inicializa el archivo html
router.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"views/index.html"));
});

module.exports=router;