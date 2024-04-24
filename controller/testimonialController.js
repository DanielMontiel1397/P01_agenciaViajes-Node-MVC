import { check, validationResult } from "express-validator";
import { Testimoniales } from "../Models/Testimoniales.js";

const envioTestimoniales = async (req,res) => {

    const {nombre, email, mensaje} = req.body

    //Validar Campos
    await check('nombre').trim().notEmpty().withMessage('El Nombre no puede ir vacio').run(req);
    await check('email').isEmail().withMessage('No es un email').run(req);
    await check('mensaje').trim().notEmpty().withMessage('El mensaje no puede ir vacio').run(req);

    let resultado = validationResult(req);

    //Mostrar erroes si no cumple con los requisitos la validación
     if(!resultado.isEmpty()){

        //Consultar BD testimoniales
        const testimoniales = await Testimoniales.findAll();

        return res.render('testimoniales',{
            pagina: 'Testimoniales',
            errores: resultado.array(),
            campos: {
                nombre,
                email,
                mensaje 
            },
            testimoniales
        })
     }

     //Almacenar en base de datos
    try{
        await Testimoniales.create({
            nombre,
            email,
            mensaje
        })
    } catch(error){
        console.log('El error es: ',error);
    }
    
    const testimoniales = await Testimoniales.findAll();

    res.render('testimoniales', {
        pagina: 'Testimoniales',
        testimoniales
    })

}

export {
    envioTestimoniales
}