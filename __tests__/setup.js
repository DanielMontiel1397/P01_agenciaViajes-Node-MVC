import db from "../config/db.js";

/*Este archivo se ejecuta una vez antes de todos los tests
conectamos a la BD agenciaviajes_test
limpiamos y recreamos la BD en cada ejecución
Cerramos la conexión a la BD */

//Conectamos a la BD antes de todos los tests

beforeAll(async ()=> {
    try{
        await db.authenticate();
        await db.sync({force: true});
        console.log('BASE DE DATOS TEST CONECTADA CORRECTAMENTE');
    } catch(error){
        console.log('ERROR AL CONECTAR A LA BD testing');
        throw error;
    }
})

beforeEach(async () => {
    await db.sync({ force: true });
});

//Cerramos la conexión después de todos los tests
afterAll(async () => {
    try{
        await db.close();
        console.log('BD Test Cerrada');
    } catch(error){
        console.log('Error al cerrar BD Test');
    }
})