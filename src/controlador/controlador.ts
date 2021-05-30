import { Request, Response } from "express";
import { cxMysql } from '../mysqldb';

export const getEmpleados = (req:Request, res:Response) => new Promise((resolve, reject) => {
    cxMysql.getConnection((err, connection) => {
        if (err){ 
          console.error(err);
          res.send(err);
          return;
        }
        console.log('MySQL Connection: ', connection.threadId);
        connection.query('SELECT * FROM empleado limit 10', (err, empleado) => {
          if (err) console.error(err);
          //console.log('User Query Results: ', results);
          res.render('results', {
            data:empleado
          });
        });
        
      });
  }); 

export const getEmpleadosXID = (req:Request, res:Response) => new Promise((resolve, reject) => {
    const id = parseInt(req.params.legajo);
    cxMysql.getConnection((err, connection) => {
        if (err){
          console.error(err);
          res.send(err);
          return;
        } 
        connection.query(`Select * from empleado where legajo = '${id}'`,(err, results) => {
          if (err) console.error(err);
          res.send(results)
        });
      });
  });

export const insertEmpleados = (req:Request, res:Response) => new Promise((resolve, reject) => {
    
    const {legajo, apellido, nombre, dni, sector,fechaIngreso,activo} = req.body;
    var values = [legajo, apellido, nombre, dni, sector,fechaIngreso,activo];
    cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        else{
            let sql:string = 'INSERT INTO empleado(legajo, apellido, nombre, dni, sector,fechaIngreso,activo) VALUES (?, ?, ?, ?, ?, ?, ?)';
            connection.query(sql, values, (err, results) => {
                if (err) {
                  console.error(err);
                  res.json({message:"Error al tratar de insertar"})
                }else{
                  res.json({message:"Articulo Insertado con exito"})
                }
              });
        }          
      });
});

export const updateEmpleados = (req:Request, res:Response) => new Promise((resolve, reject) => {
    const {legajo, apellido, nombre, dni, sector,fechaIngreso,activo} = req.body;
    var values = [apellido, nombre, dni, sector,fechaIngreso,activo,legajo];
    cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        else{
            let sql:string = 'UPDATE empleado SET apellido=?, nombre=?, dni=?, sector=?, fechaIngreso=?,activo=? WHERE legajo=?';
            connection.query(sql, values, (err, results) => {
                if (err) {
                  console.error(err);
                  res.json({message:"Error al actualizar " + err})
                }else{
                  res.json({message:"Articulo Actualizado con exito"})
                }
               
              });
        }          
      });
});

export const deleteEmpleados = (req:Request, res:Response) => new Promise((resolve, reject) => {
    const id = parseInt(req.params.legajo);
    cxMysql.getConnection((err, connection) => {
          if (err) {
            console.error(err);
            res.send(err);
            return;
          }
          connection.query('DELETE FROM empleado WHERE legajo = ?', [id],(err, results) => {
          if (err) {
            console.error(err);
            res.json({message:"Error al tratar de Eliminar"})
          }else{
            res.json({message:"Articulo Eliminado con exito"})
          }
          
        });
      });
});
