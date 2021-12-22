/*
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

Archivo donde se conectara la base de datos.

$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
*/

const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
    host:"us-cdbr-east-05.cleardb.net",
    user: "bcf94895798032",
    password:'47f86124',
    database:"heroku_da469fd98a6efa5",
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