import { body, param, validationResult } from "express-validator"
import { Testimoniales } from "../Models/Testimoniales.js";

export const validarTestimonial = [
    //Validar Campos
    body('nombre').trim().notEmpty().withMessage('El Nombre no puede ir vacio'),
    body('email').isEmail().withMessage('No es un email'),
    body('mensaje').trim().notEmpty().withMessage('El mensaje no puede ir vacio'),

]

export const handleInputErrors = async (req, res, next) => {
    const { nombre, email, mensaje } = req.body;
    const errores = validationResult(req);

    if (!errores.isEmpty()) {

        const testimoniales = await Testimoniales.findAll();

        return res.status(400).render('testimoniales', {
            pagina: 'Testimoniales',
            errores: errores.array(),
            campos: {
                nombre,
                email,
                mensaje
            },
            testimoniales
        })
    }
    next();
}

export const validarParametro = [
    param('viaje')
        .notEmpty().withMessage('El parámetro no puede estar vacío')
        .matches(/^[a-z0-9-]+$/).withMessage('Formato de slug inválido')
];

export const handleInputErrorsParam = async (req, res, next) => {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(404).render('404');
    }
    next()
}