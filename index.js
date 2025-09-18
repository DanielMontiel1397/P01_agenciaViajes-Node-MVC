import express from 'express'
import router from './routes/rutasView.js';
import db from './config/db.js';

const app = express();

const port = process.env.PORT || 4000;

//Conexión a Base de datos
try {
    await db.authenticate();
    db.sync();
    console.log('La Base de Datos se conecto correctamente');
} catch(error){
    console.log('Hubo un error al conectar a la base de datos',error);
}

//Habilitar Pug
app.set('view engine','pug');
app.set('views','./views');

//Habilitar Lectura d Datos del formulario
app.use(express.urlencoded({extended:true}));

//Obtener el año actual
app.use( (req,res,next) => {
    const year = new Date();

    res.locals.ActualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes"
    return next();
})

//Definir la carpeta publica
app.use('/AgenciaViajes', express.static('public'));

//Agregar Router
app.use('/AgenciaViajes',router);


app.listen(port,()=>{
    console.log(`El servidor esta funcionando en el puerto: ${port}`);
})