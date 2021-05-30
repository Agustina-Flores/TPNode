import express from "express";
const path = require('path');
const app = express();

import rutas from './rutas';

//para transformar los datos a objetos json
app.use(express.json());
//transformar los datos de un formulario html a objetos json 
app.use(express.urlencoded({extended:false}));

app.use(rutas);

app.listen(3000, () => {
    console.log("Servidor en puerto 3000", 3000);
   
 app.set('view engine' , 'ejs');

 app.set('views', path.join(__dirname, 'views'));
})