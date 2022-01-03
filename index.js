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
app.use("/public",express.static("./public"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Routes, distintas rutas que tomara el sitio web
app.use("/api",require("./routes/apis.js"));
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"views/index.html"));
});

app.get("/login.html",(req,res)=>{
    res.sendFile(path.join(__dirname,"views/login.html"));
});



//Empezar el servidor a funcionar en el puerto asignado
app.listen(app.get("port"),()=>{
    console.log ("Server funcionando desde puerto:",app.get("port"));
})