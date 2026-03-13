import express from 'express'
import { paginaInicio, paginaNosotros, paginaViajes, paginaViajesDetalles, paginaTestimoniales} from '../controller/paginasController.js';
import { envioTestimoniales } from '../controller/testimonialController.js';
import { handleInputErrors, handleInputErrorsParam, validarParametro, validarTestimonial } from '../middleware/validaciones.js';

const router = express.Router();

//vista Inicio
router.get('/', paginaInicio)

//Vista Nosotros
router.get('/nosotros', paginaNosotros)

//Vista Viajes
router.get('/viajes', paginaViajes)
router.get('/viajes/:viaje',
    validarParametro,
    handleInputErrorsParam,
    paginaViajesDetalles)


//Vista testimoniales
router.get('/testimoniales', paginaTestimoniales)
router.post('/testimoniales', 
    validarTestimonial,
    handleInputErrors,
    envioTestimoniales);

export default router;