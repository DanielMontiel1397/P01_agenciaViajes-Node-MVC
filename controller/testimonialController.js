import { Testimoniales } from "../Models/Testimoniales.js";

const envioTestimoniales = async (req,res) => {

    const {nombre, email, mensaje} = req.body

     //Almacenar en base de datos
    try{
        await Testimoniales.create({
            nombre,
            email,
            mensaje
        })

    } catch(error){
        console.log('El error es: ',error);
        return res.render('testimoniales',{
            errores: [{msg: 'Hubo un problema al guardar el testimonial. Intenta nuevamente'}]
        })
    }
    
    //Redirigimos a la página de Testimoniales
    res.redirect('/testimoniales?success=true')

}

export {
    envioTestimoniales
}