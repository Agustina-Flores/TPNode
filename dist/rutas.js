"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controlador_1 = require("./controlador/controlador");
const router = express_1.Router();
router.get('/test', (requ, resp) => resp.send('HOLA MUNDO'));
router.get('/empleado', controlador_1.getEmpleados);
router.get('/empleado/:legajo', controlador_1.getEmpleadosXID);
router.post('/insert', controlador_1.insertEmpleados); //insert
router.put('/update', controlador_1.updateEmpleados); //update
/*router.delete('/delete/:legajo', controlador_1.deleteEmpleados); //eliminar*/
exports.default = router;
