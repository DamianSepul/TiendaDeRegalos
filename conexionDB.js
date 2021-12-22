/*
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

Archivo donde se conectara la base de datos.

$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
*/

const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
    host:"localhost",
    user: "root",
    password:'',
    database:"test",
    multipleStatements:true
});

mysqlConnection.connect((err)=>{
    if(err){
        console.log("no se pudo conectar la BD");
        console.error(err);
        return;
    }else{
        console.log("La base de datos esta conectada");
    }
});

module.exports=mysqlConnection;