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
    mysqlConnection.query("SELECT * FROM promociones", (err, rows, fields) => {
        if (!err) {
            res.json(rows)
        } else {
            res.json({
                mensaje: "Error al mostrar las promociones"
            });
        }
    });
});

module.exports=router;