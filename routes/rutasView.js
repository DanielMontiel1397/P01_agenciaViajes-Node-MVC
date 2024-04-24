import express from 'express'
import { paginaInicio, paginaNosotros, paginaViajes, paginaViajesDetalles, paginaTestimoniales} from '../controller/paginasController.js';
import { envioTestimoniales } from '../controller/testimonialController.js';
const router = express.Router();

//vista Inicio
router.get('/', paginaInicio)

//Vista Nosotros
router.get('/nosotros', paginaNosotros)

//Vista Viajes
router.get('/viajes', paginaViajes)
router.get('/viajes/:viaje',paginaViajesDetalles)


//Vista testimoniales
router.get('/testimoniales', paginaTestimoniales)
router.post('/testimoniales', envioTestimoniales);

export default router;