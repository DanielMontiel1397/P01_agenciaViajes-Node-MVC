import request from 'supertest';
import app from '../../index.js';
import { Viaje } from '../../Models/Viaje.js';
import { Testimoniales } from '../../Models/Testimoniales.js';

describe('GET /', () => {
    it('Debería responde correctamente la página de inicio', async () => {
        const response = await request(app).get('/');

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/html/);
        expect(response.text).toContain('Agencia de Viajes')
    })
})

describe('GET /nosotros', () => {
    it('Deberia responder correctamente la página de Nosotros', async () => {

        const response = await request(app).get('/nosotros');

        expect(response.status).toBe(200);
        expect(response.status).not.toBe(404)
        expect(response.headers['content-type']).toMatch(/html/);
        expect(response.text).toContain('Nosotros');
    })

})

describe('GET /viajes', () => {
    it('Deberia mostrar correctamente la página Viajes', async () => {

        const response = await request(app).get('/viajes');

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/html/);
        expect(response.text).toContain('Próximos Viajes');
    })

    it('Deberia mostrar los viajes de la base de datos', async () => {
        await Viaje.create({
            titulo: 'Viaje a Cancún',
            precio: '3500',
            fecha_ida: new Date('2025-06-01'),
            fecha_vuelta: new Date('2025-06-08'),
            imagen_horizontal: 'cancun_h.jpg',
            imagen_vertical: 'cancun_v.jpg',
            descripcion: 'Hermosas playas del Caribe mexicano',
            disponibles: '10',
            slug: 'viaje-cancun'
        });

        const response = await request(app).get('/viajes');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Viaje a Cancún');
    })
})

describe('GET /viajes/:viaje', () => {


    it('Si el viaje no existe debería de mostrar un 404', async () => {
        const parametros = 'viaje-que-no-existe';
        const response = await request(app).get(`/viajes/${parametros}`)

        expect(response.status).toBe(404);
        expect(response.headers['content-type']).toMatch(/html/);
        expect(response.text).toContain('404');
    });

    it('Parámetro no correcto en la url', async () => {
        const parametros = 'viaje$#';
        const response = await request(app).get(`/viajes/${parametros}`)

        expect(response.status).toBe(404);
        expect(response.headers['content-type']).toMatch(/html/);
        expect(response.text).toContain('404');
    })

    it('Deberia responder correctamente la página de Viaje Detallado', async () => {

        await Viaje.create({
            titulo: 'Viaje a Japon',
            precio: '8500',
            fecha_ida: new Date('2025-07-15'),
            fecha_vuelta: new Date('2025-07-22'),
            imagen_horizontal: 'Japon-h.jpg',
            imagen_vertical: 'Japon-v.jpg',
            descripcion: 'La ciudad del amor y las luces',
            disponibles: '5',
            slug: 'viaje-japon'
        });

        const parametros = 'viaje-japon';
        const response = await request(app).get(`/viajes/${parametros}`)

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/html/);
    })

})

describe('GET /testimoniales', () => {
    it('Deberia mostrar correctamente la testimoniales', async () => {

        const response = await request(app).get('/testimoniales');

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/html/);
        expect(response.text).toContain('Testimoniales');
    })

    it('Debería mostrar el formulario para agregar testimonial', async () => {
        const response = await request(app).get('/testimoniales');

        expect(response.status).toBe(200);
        expect(response.text).toContain('<form');
        expect(response.text).toContain('nombre');
        expect(response.text).toContain('email');
        expect(response.text).toContain('mensaje');
    });

    it('Deberia mostrar Testimoniales existentes', async () => {
        await Testimoniales.create({
            nombre: 'Nombre test',
            email: 'test@test.com',
            mensaje: 'No me gusto nada esta agencia'
        });

        const response = await request(app).get('/testimoniales');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Nombre test');
    })
})

describe('POST /testimoniales', () => {
    it('Deberia validar que los campos son correctos', async () => {
        const data = {
            nombre: '',
            email: '',
            mensaje: ''
        }

        const response = await request(app).post('/testimoniales').type('form').send(data);

        expect(response.status).toBe(400);
        expect(response.headers['content-type']).toMatch(/html/);
        expect(response.text).toContain('El Nombre no puede ir vacio')
        expect(response.text).toContain('No es un email')
        expect(response.text).toContain('El mensaje no puede ir vacio')

        const testimoniales = await Testimoniales.findAll();
        expect(testimoniales).toHaveLength(0);

    });

    it('Deberia crear el testimonio correctamente', async () => {
        const data = {
            nombre: 'Nombre test',
            email: 'testApellido@test.com',
            mensaje: 'Excelente Lugar'
        };

        const response = await request(app).post('/testimoniales').type('form').send(data);

        // Verificar redirección
        expect(response.status).toBe(302);
        expect(response.headers.location).toBe('/testimoniales?success=true');

        // Verificar que SÍ se guardó en BD
        const testimoniales = await Testimoniales.findAll();
        expect(testimoniales).toHaveLength(1);  // ← AGREGAR: Verifica que hay 1

        // Verificar datos guardados
        expect(testimoniales[0].nombre).toBe('Nombre test');  // ← Consistente con data
        expect(testimoniales[0].email).toBe('testApellido@test.com');
        expect(testimoniales[0].mensaje).toBe('Excelente Lugar');
    });

})