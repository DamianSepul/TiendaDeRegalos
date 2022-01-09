const axios = require('axios');
const express = require('express');
const request  = require('request');
const router = express.Router();
const path = require ("path");
const mysqlConnection = require("../conexionDB");
const { response } = require('express');
const { url } = require('inspector');
const { header } = require('express/lib/request');

router.get("/", (req, res) => {
    mysqlConnection.query("SELECT * FROM enviosHotel", (err, rows, fields) => {
        if (!err) {
            res.json(rows)
        } else {
            res.json({
                mensaje: "Error al mostrar los envios"
            });
        }
    });
});

router.delete("/Borrar/:id", (req, res) => {
    const { id } = req.body;
    mysqlConnection.query("DELETE FROM envioshotel WHERE idEnvio = ?", [req.params.id], function (err, rows) {
        if (err) {
            throw err
        } else {
            res.send(rows)
        }
    })
})

module.exports=router;