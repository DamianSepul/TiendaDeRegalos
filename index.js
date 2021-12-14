/*
    ################################################
    Documento principal de Node JS, aqui se desegigna
    que puerto va a utilizar y que su configuración
    de rutas.
    #################################################
*/

//Inicialización de frameworks y de librerias.
const express = require ("express");
const app = express();
const morgan = require ("morgan");
const path= require ("path");

//Configuración del servidor
app.set("port",process.env.PORT||3000);
app.set("json space",2);


//Middlewares, acciones necesarias para realizar las apis.
app.use(morgan("dev"));
app.use("/images",express.static("./images"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Routes, distintas rutas que tomara el sitio web
app.use(require('./apis.js'));


//Empezar el servidor a funcionar en el puerto asignado
app.listen(app.get("port"),()=>{
    console.log ("Server funcionando desde puerto:",app.get("port"));
})