/*
    ################################################
    Documento donde se alojaran las apis, aqui se 
    vera como se realizan querys para que las apis
    se comuniquen con una base de datos.
    #################################################
*/
const axios = require('axios');
const express = require('express');
const request  = require('request');
const router = express.Router();
const path = require ("path");
const mysqlConnection = require("../conexionDB");
const { response } = require('express');
const { url } = require('inspector');
const { header } = require('express/lib/request');


//Api para conectarse desde TIENDA DE REGALOS => CENTRAL DEERLAND
router.get("/ProductoTiendaDeRegalo",(req,res)=>{
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

//API para registrar las ventas realizadas en central. CENTRAL => TIENDA
router.post("/SouvenirsVendidos",(req,res)=>{
    const {NumVenta,idProducto,idTransaccion,numTransaccion,numTarjeta,FechaV,idCliente,total}=req.body;
    mysqlConnection.query(`
    INSERT INTO transacciones VALUES ('${idTransaccion}','${numTransaccion}','Completada');
    INSERT INTO venta  VALUES ('${NumVenta}','${FechaV}','${numTarjeta}','Central','${idCliente}','${idTransaccion}','${total}');`,
    (err,rows,fields)=>{
        
        if(!err){
            res.json({status: "Se registro la venta correctamente"});
        }else {
            console.log(err);
            res.json({status: "Error en registrar a los souvenirs vendidos"});
        }
    });
});

//APi para realizar el monto a la habitación de hotel. TIENDA => HOTEL
//Discutir con el taquitos sobre esta api
//Discutir con los pibes sobre la id de venta y guardarla en local.
router.get ("/MontoServicioHabitacion",(req,res)=>{
    //Ahorita solo usamos esa id como prueba pero en el desarrollo mas adelante
    //Se va a cambiar
    const idVenta=4;
    mysqlConnection.query(`SELECT envioshotel.nombreDest,envioshotel.nHabitacion,venta.total FROM envioshotel,venta WHERE venta.idVenta=${idVenta}`,
    (err,rows,fields)=>{
      
        if(!err){
            res.json(rows);
        }else{
            res.json({
                mensaje:"Ocurrio un error, favor de verificar los datos"
            });
        }
    });
});



//API para realizar una petición a experiencias DEERLAND. TIENDA => EXP DEERLAND
//Idproducto sera cambiado mas adelante del proyecto utilizando procedimientos almacenados
router.get("/PromocionesTR/",(req,res)=>{
    let idProducto=1;
    mysqlConnection.query(`SELECT idProducto,precio,descripcion FROM productos WHERE idProducto= ${idProducto}`,(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else {
            res.json({
                mensaje:"Ocurrio un error, favor de introducir bien el id de producto"
            });
        }
    });
});

router.post("/PromocionesRecepcionTR",(req,res)=>{
    const {idProducto,descuento_promo,vigencia}=req.body;
    if(res.status(200)){
        mysqlConnection.query(
            `INSERT INTO promociones VALUES ('${idProducto}','${descuento_promo}','${vigencia}')`
            ,(err,rows,fields)=>{
                if(!err){
                    res.json({
                        message:"Se recibieron  de manera correcta las promociones"
                    });
                }else{
                    res.json({
                        message:"Hubo un error ala hora de recibir las promociones, favor de enviar los datos correctamente"
                    });
                }
            });
    }
});


//API para la solicitud de transferencia con banco. TIENDA => BANCO
  router.post("/SolicitudTransferencia",(req,res)=>{
     
    //Falta incluir que usuario lo esta utilizando pero seria en la pagina. Ese 1 es el usuario por defecto
      axios.post("https://deerbank.herokuapp.com/transfer/",req.body,
      {
      headers: {Authorization: "Token 7c06d1ce8d6d8789d2f97d139b95b33751766246"}
    })
      .then(data=>{
        const {transaction_num,status,date,ammount,origin,destiny}=data.data;
        mysqlConnection.query(`INSERT INTO transacciones (numTransaccion, estado) VALUES ('${transaction_num}','${status}');
        INSERT INTO venta (fecha,numTarjeta,tipoVenta,idCliente,idTransaccion,total) VALUES('${date}','${origin}','Tienda',1,last_insert_id(),'${ammount}')
        `,(err,rows,fields)=>{
            if(!err){
                res.json({status:"Transacción exitosa"});
            }else{
                console.log(err);
                res.json({status: "Transacción fallida, favor de revisar los datos"});
            }
        });
        
    })
    .catch(error=>{
        res.status(500).send({
            message:  "Ocurrio un error con el servidor"
        })
    })      
 });

module.exports=router;
