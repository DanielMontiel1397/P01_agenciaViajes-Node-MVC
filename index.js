import express from 'express'
import router from './routes/rutasView.js';
import db from './config/db.js';
import dotenv from 'dotenv'

dotenv.config();

const app = express();

//Conexión a Base de datos
//Conectamos a la base de datos solo si NO estamos en ambiente de testing
if(process.env.NODE_ENV !== 'test'){
    try {
        await db.authenticate();
        db.sync();
        console.log('La Base de Datos se conecto correctamente');
    } catch(error){
        console.log('Hubo un error al conectar a la base de datos',error);
    }
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
app.use(express.static('public'));

//Agregar Router
app.use('/',router);

//Middleware 404
app.use((req,res) => {
    res.status(404).render('404');
})

//Iniciamos servidor SOLO si NO estamos importando este archivo
if(process.env.NODE_ENV !== 'test'){
    const port = process.env.PORT || 4000;
    app.listen(port,()=>{
        console.log(`El servidor esta funcionando en el puerto: ${port}`);
    })
}

//Exportamos la APP
export default app;
