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



/**
 * @api {get} https://tienda-de-regalos-deerland.herokuapp.com/api//ProductoTiendaDeRegalo Información productos tienda de regalos
 * @apiName GetProductoTiendaDeRegalo
 * @apiGroup Central
 * 
 * @apiSuccess {Number} id id del producto.
 * @apiSuccess {String} nombre nombre del producto.
 * @apiSuccess {Number} precio precio del producto.
 * @apiSuccess {Number} stock stock del producto.
 * @apiSuccess {String} descripcion descripcion del producto.
 * 
 * @apiSucessExample Successful Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "idProducto":1,
 *          "nombre":"Peluche",
 *          "precio":20,
 *          "stock":20,
 *          "descripcion":"Osito de peluche"
 *      }
 * @apiError Error al obtener información de los productos
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       mensaje:"Error al mostrar los productos"
 *     }
 */



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

/**
 * @api {post} https://tienda-de-regalos-deerland.herokuapp.com/api//SouvenirsVendidos Registro de Productos vendidos desde central Deerland
 * @apiName PostSouvenirsVendidos
 * @apiGroup Central
 * 
 * @apiParam {Number} id id de la venta
 * @apiParam {Number} id id del producto
 * @apiParam {Number} id id de la transacción
 * @apiParam {Number} id id de la venta
 * @apiParam {Number} numero numero de la transacción
 * @apiParam {Number} numero numero de la tarjeta del cliente (ultimos 4 digitos)
 * @apiParam {Number} id id de la venta
 * @apiParam {String} fecha fecha en que se realizo la venta
 * @apiParam {Number} id id del cliente 
 * @apiParam {Number} total total de la venta relizada
 * 
 * @apiParamExample Example body:
 * {
 *  idVenta: 13,
 *  idProducto: 1,
 *  idTransaccion:8,
 *  numTransaccion:23123,
 *  numTarjeta:4221,
 *  FechaV: "2021-12-25",
 *  idCliente: 1,
 *  total: 400
 * }
 * 
 * @apiSucessExample Successful Response:
 *      HTTP/1.1 200 OK
 *      {
 *          status: "Se registro la venta correctamente"
 *      }
 * @apiError Error al registrar un producto
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       mensaje:"Ocurrio un error, favor de verificar los datos
 *     }
 */


//API para registrar las ventas realizadas en central. CENTRAL => TIENDA
router.post("/SouvenirsVendidos",(req,res)=>{
    const {NumVenta,idProducto,idTransaccion,numTransaccion,numTarjeta,FechaV,idCliente,total,cantidad}=req.body;
    mysqlConnection.query(`
    INSERT INTO transacciones VALUES ('${idTransaccion}','${numTransaccion}','Completada');
    INSERT INTO venta  VALUES ('${NumVenta}', '${FechaV}', '${numTarjeta}', 'Central', '${idCliente}', '${idTransaccion}', '${total}');
    INSERT INTO ventadetalle (cantidad, precio, idProducto, idVenta)  VALUES ('${cantidad}','${total}','${idProducto}', '${NumVenta}');
    UPDATE productos SET stock = stock-${cantidad} WHERE idProducto = ${idProducto}
    `,
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
router.get("/MontoServicioHabitacion/:idVenta",(req,res)=>{
    const {idVenta}=req.params;
    let idVentax= idVenta||1;
    mysqlConnection.query(`SELECT envioshotel.nombreDest,envioshotel.nHabitacion,venta.total FROM envioshotel,venta WHERE venta.idVenta=${idVentax}`,
    (err,rows,fields)=>{
      
        if(!err){
            // axios.get("url")
            // .then(data=>{

            // })
            // .catch(error=>{

            // })
            res.json(rows);
            console.log(rows[0].nombreDest);
            // axios.post("url",envio)
            // .then(data=>{
            //     console.log(envio);
            // })
            // .catch(error=>{
            //     res.status(500).send({
            //         message:  "Ocurrio un error con el servidor"
            //     })
            // });
        }else{
            res.json({
                mensaje:"Ocurrio un error, favor de verificar los datos"
            });
        }
    });

});



//API para realizar una petición a experiencias DEERLAND. TIENDA => EXP DEERLAND
//Idproducto sera cambiado mas adelante del proyecto utilizando procedimientos almacenados
router.get("/PromocionesTR/:id",(req,res)=>{
    const {id}=req.params;
    let idProducto=id||1;
    mysqlConnection.query(`SELECT idProducto,precio,descripcion FROM productos WHERE idProducto= ${idProducto}`,(err,rows,fields)=>{
        if(!err){
            res.json(rows);
            console.log(rows[0].precio);
            // axios.post("url",envio)
            // .then(data=>{
            //     console.log(envio);
            // })
            // .catch(error=>{
            //     res.status(500).send({
            //         message:  "Ocurrio un error con el servidor"
            //     })
            // });
        }else {
            res.json({
                mensaje:"Ocurrio un error, favor de introducir bien el id de producto"
            });
        }
    });
});

/**
 * @api {post} https://tienda-de-regalos-deerland.herokuapp.com/api/PromocionesRecepcionTR Registro de promociones mandadas por experiencias Deerland
 * @apiName Recepción de promociones Tienda de regalos
 * @apiGroup Experencias DEERLAND
 * 
 * @apiParam {Number} id id del producto
 * @apiParam {String} descuento_promo descuento que se aplicara al proyecto
 * @apiParam {String} vigencia vigencia de la promoción
 * 
 * @apiParamExample Example body:
 * {
 *  "idProducto": 1,
 *  "descuento_promo": "20%",
 *  "vigencia": "2025-09-26"   
 * }
 * 
 * @apiSucessExample Successful Response:
 *      HTTP/1.1 200 OK
 *      {
 *          message:"Se recibieron  de manera correcta las promociones"
 *      }
 * @apiError Error al registrar un producto
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       message:"Hubo un error ala hora de recibir las promociones, favor de enviar los datos correctamente"
 *     }
 */

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
  router.post("/SolicitudTransferencia/:idCliente",(req,res)=>{
     const {idCliente}=req.params;
     let idClientex= idCliente||1;
     console.log(idCliente);
    //Falta incluir que usuario lo esta utilizando pero seria en la pagina. Ese 1 es el usuario por defecto
      axios.post("https://deerbank.herokuapp.com/transfer/",req.body,
      {
      headers: {Authorization: "Token 7c06d1ce8d6d8789d2f97d139b95b33751766246"}
    })
      .then(data=>{
        const {transaction_num,status,date,ammount,origin,destiny}=data.data;
        mysqlConnection.query(`INSERT INTO transacciones (numTransaccion, estado) VALUES ('${transaction_num}','${status}');
        INSERT INTO venta (fecha,numTarjeta,tipoVenta,idCliente,idTransaccion,total) VALUES('${date}','${origin}','Tienda','${idClientex}',last_insert_id(),'${ammount}')
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
