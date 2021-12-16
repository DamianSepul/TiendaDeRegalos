/*
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

Archivo donde se conectara la base de datos.

$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
*/

const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"password",
    database:"tr",
    multipleStatements:true
});

mysqlConnection.connect((err)=>{
    if(err){
        console.error(err);
        return;
    }else{
        console.log("La base de datos esta conectada");
    }
});

module.exports=mysqlConnection;