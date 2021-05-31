"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysqldb_1 = require("../mysqldb");
exports.getEmpleados = (req, res) => new Promise((resolve, reject) => {
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        console.log("MySQL Connection: ", connection.threadId);
        connection.query("SELECT * FROM empleado limit 10", (err, empleado) => {
            if (err)
                console.error(err);
            //console.log('User Query Results: ', results);
            res.render("results", {
                data: empleado,
            });
        });
    });
});
exports.getEmpleadosXID = (req, res) => new Promise((resolve, reject) => {
    const id = parseInt(req.params.legajo);
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        connection.query(`Select * from empleado where legajo = '${id}'`, (err, results) => {
            if (err)
                console.error(err);
            res.send(results);
        });
    });
});
exports.insertEmpleados = (req, res) => new Promise((resolve, reject) => {
    const { legajo, apellido, nombre, dni, sector, fechaIngreso, activo } = req.body;
    var values = [legajo, apellido, nombre, dni, sector, fechaIngreso, activo];
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        else {
            let sql = "INSERT INTO empleado(legajo, apellido, nombre, dni, sector,fechaIngreso,activo) VALUES (?, ?, ?, ?, ?, ?, ?)";
            connection.query(sql, values, (err, results) => {
                if (err) {
                    console.error(err);
                    res.json({ message: "Error al tratar de insertar" });
                }
                else {
                    res.json({ message: "Articulo Insertado con exito" });
                }
            });
        }
    });
});
exports.updateEmpleados = (req, res) => new Promise((resolve, reject) => {
    const { legajo, apellido, nombre, dni, sector, fechaIngreso, activo } = req.body;
    var values = [apellido, nombre, dni, sector, fechaIngreso, activo, legajo];
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        else {
            let sql = `UPDATE empleado SET apellido=?, nombre=?, dni=?, sector=?, fechaIngreso=?,activo=? WHERE legajo=${req.params.legajo}`;
            connection.query(sql, values, (err, results) => {
                if (err) {
                    console.error(err);
                    res.json({ message: "Error al actualizar " + err });
                }
                else {
                    res.json({ message: "Articulo Actualizado con exito" });
                }
            });
        }
    });
});
exports.deleteEmpleados = (req, res) => new Promise((resolve, reject) => {
    const id = parseInt(req.params.legajo);
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        connection.query("DELETE FROM empleado WHERE legajo = ?", [id], (err, results) => {
            if (err) {
                console.error(err);
                res.json({ message: "Error al tratar de Eliminar" });
            }
            else {
                res.json({ message: "Articulo Eliminado con exito" });
            }
        });
    });
});
