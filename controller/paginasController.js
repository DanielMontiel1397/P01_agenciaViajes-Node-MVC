import { Testimoniales } from "../Models/Testimoniales.js"
import { Viaje } from "../Models/Viaje.js"

const paginaInicio = async (req, res) => {

    //Consultar 3 viajes del modelo viaje y 3 testimoniales
    try {
        const [viajes, testimoniales] = await Promise.all([Viaje.findAll({ limit: 3 }), Testimoniales.findAll({ limit: 3 })])

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            resultado: viajes,
            testimoniales: testimoniales
        });

    } catch (error) {
        console.error("Error al cargar la pagina de inicio: ", error);
        return res.status(500).render('500')
    }
}

const paginaNosotros = (req, res) => {

    res.render('nosotros', {
        pagina: 'Nosotros'
    })

}

const paginaViajes = async (req, res) => {

    try {
        
        //Consultar base de datos
        const viajes = await Viaje.findAll();

        return res.render('viajes', {
            pagina: 'Próximos Viajes',
            resultado: viajes
        })

    } catch (error) {

        console.error("Error al cargar la pagina de viajes: ", error);
        return res.status(500).render('500')
    }
}

//Vista mostrar detalles de viaje
const paginaViajesDetalles = async (req, res) => {

    const { viaje } = req.params;

    try {
        const resultado = await Viaje.findOne({ where: { slug: viaje } })

        if (!resultado) {
            return res.status(404).render('404');
        }

        return res.render('viaje', {
            pagina: 'Información Viaje',
            respuesta: resultado
        })

    } catch (error) {
        console.error("Error al cargar la pagina de viaje: ", error);
        return res.status(500).render('500')
    }
}

const paginaTestimoniales = async (req, res) => {

    try {
        const testimoniales = await Testimoniales.findAll();

        if (req.query.success) {
            return res.render('testimoniales', {
                pagina: "Testimoniales",
                testimoniales,
                msg: 'Testimonial Guardado Correctamente'
            })
        }

        return res.render('testimoniales', {
            pagina: "Testimoniales",
            testimoniales
        })
    } catch (error) {
        console.error("Error al cargar la pagina de testimoniales: ", error);
        return res.status(500).render('500')
    }

}



export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaViajesDetalles,
    paginaTestimoniales
}