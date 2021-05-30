import {Router} from 'express'
import {getEmpleados, getEmpleadosXID, insertEmpleados, updateEmpleados, deleteEmpleados} from './controlador/controlador'

const router = Router();

router.get('/test', (requ, resp) => resp.send('HOLA MUNDO'));

router.get('/empleado', getEmpleados);
router.get('/empleado/:legajo', getEmpleadosXID);
router.post('/insert', insertEmpleados);//insert
router.put('/update', updateEmpleados);//update
router.delete('/delete/:legajo', deleteEmpleados);//eliminar

export default router;