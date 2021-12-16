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

const mysqlConnection = require("./conexionDB.js");
//Cuando se solicita la carpeta raiz se inicializa el archivo html
// router.get("/",(req,res)=>{
//     res.sendFile(path.join(__dirname,"views/index.html"));
// });


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

//APi para realizar el monto a la habitación de hotel. TIENDA => HOTEL
//Discutir con los pibes sobre la id de venta y guardarla en local.
router.get ("/MontoServicioHabitacion/:idVenta",(req,res)=>{
    //Ahorita solo usamos esa id como prueba pero en el desarrollo mas adelante
    //Se va a cambiar
    const {idVenta} = req.params;
    mysqlConnection.query('SELECT envioshotel.nombreDest,envioshotel.nHabitacion,venta.total FROM envioshotel,venta WHERE venta.idVenta= ?',[idVenta],
    (err,rows,fields)=>{
      
        if(!err){
            res.json(rows);
        }else{
            res.json({
                mensaje:"Ocurrio un error, introduzca bien la id de venta"
            });
        }
    });
});

//API para realizar una petición a experiencias DEERLAND. TIENDA => EXP DEERLAND
//Idproducto sera cambiado mas adelante del proyecto utilizando procedimientos almacenados
router.get("/PromocionesTR/:idProducto",(req,res)=>{
    const {idProducto}=req.params;
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

//API para la solicitud de transferencia con banco. TIENDA => BANCO
router.get ("/SolicitudTransferencia",(req,res)=>{
    //Como los datos bancarios no se almacenan, usaran variables
    //Queda como construccion para otro dia
    let CtaDest= 5138100775916044;
    let CtaOrig= 5363076885961565;
    let Vig="12/24";
    let CVV=098;
    let Monto=200;
    let Concepto="Comprar un regalo para Lupe";


});

//API para recibir la información de la transferencia del banco. BANCO => TIENDA
/*
    Falta agregar cuando se realiza la venta de un producto
    Tambien la id que pasa sera una variable local, es la id de venta
    falta revisar el query , problema con la id de transaccion
    Queda bajo construcción para otro dia
    
*/
router.post("/EstadoTransferencia/:id",(req,res)=>{
    if(res.status(200)){
        const {transaction_num,status,date,ammount,origin,destiny}=req.body;

        mysqlConnection.query(`INSERT INTO transacciones (numTransaccion, estado) VALUES ('${transaction_num}','${status}');
        INSERT INTO venta (fecha,numTarjeta,tipoVenta,idCliente,idTransaccion,total) VALUES('${date}','${origin}','Tienda',${id},SELECT idTransaccion FROM transacciones WHERE numtransaccion = ${transaction_num},'${ammount}')
        `,(err,rows,fields)=>{
            if(!err){
                res.json({status:"Algo bien"});
            }else{
                console.log(err);
                res.json({status: "algo mal"});
            }
        });
    }else if (res.status(400)){
        res.json({status: "algo mal"});
    }

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
module.exports=router;
