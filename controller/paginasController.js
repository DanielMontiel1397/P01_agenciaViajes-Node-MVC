import { Testimoniales } from "../Models/Testimoniales.js"
import { Viaje } from "../Models/Viaje.js"

const paginaInicio = async (req,res) => {

    const promiseDB = [];

    promiseDB.push()

    //Consultar 3 viajes del modelo viaje
    try{
        const respuesta = await Promise.all([Viaje.findAll({limit:3}),Testimoniales.findAll({limit:3})])

        res.render('inicio',{
            pagina: 'Inicio',
            clase: 'home',
            resultado: respuesta[0],
            testimoniales: respuesta[1]
        });

    } catch(error){
        console.log("El error es: ",error);
    }
}

const paginaNosotros = (req,res) => {
    res.render('nosotros',{
        pagina: 'Nosotros'
    })
}

const paginaViajes = async (req,res) => {

    const viajes = await Viaje.findAll();

    //Consultar base de datos
    res.render('viajes',{
        pagina: 'Próximos Viajes',
        resultado: viajes
    })
}

//Vista mostrar detalles de viaje
const paginaViajesDetalles = async (req,res) => {
    
    const {viaje} = req.params;

    try {
        const resultado = await Viaje.findOne({where: {slug: viaje}})
        res.render('viaje',{
            pagina: 'Información Viaje',
            respuesta: resultado
        })
    } catch(error){
        console.log(error);
    }
}

const paginaTestimoniales = async (req,res) => {
    try{
        const testimoniales = await Testimoniales.findAll();
        res.render('testimoniales', {
            pagina: "Testimoniales",
            testimoniales
        })
    } catch(error){
        console.log("El Error es: ", error);
    }
    
}



export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaViajesDetalles,
    paginaTestimoniales
}