const { Router } = require('express');
const router = new Router();

const reservaciones = require('../reserva.json');

const _ = require("underscore");

//Metodo Get de todas los Reservaciones
/**
 * @swagger
 * /api/reservations?page=2&limit=3:
 *  get:
 *    description: Use to request all Spaces
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', (req, res) => {

    //Laboratorio 1 - Paginacion Reservas

    const page = req.query.page
    const limit = req.query.limit

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const resultReservations = reservaciones.slice(startIndex, endIndex)

    res.json(resultReservations); //Retorna todos las Reservas del Parqueo

});

//Metodo Get por ID 
router.get('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(reservaciones, (reserva, i) => {
            if (reserva.id == id) {
                
                res.json(reserva); //Retorna Informacion Solicitada
            }
        });    
    }else {
        res.status(500).json({error: 'Dato no Valido'});
    }
});

//Metodo Post para las Reservaciones
router.post('/', (req, res) => {
    const id = reservaciones.length + 1;
    const { placa, idspace, time} = req.body;
    const newReservacion = { ...req.body, id };
    if (id && placa && idspace && time ) {
        reservaciones.push(newReservacion);
        res.json(reservaciones);
    } else {
        res.status(500).json({error: 'Los datos no son validos'});
    }
});

//Metodo Put para las Reservaciones
/**
 * @swagger
 * /reservations:
 *  put:
 *    description: Use to update a Space
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { placa, idspace, time } = req.body;
    if (id && placa && idspace && time) {
        _.each(reservaciones, (reserva, i) => {
            if (reserva.id === id) {
                reserva.placa = placa;
                reserva.idspace = idspace;
                reserva.time = time;
            }
        });
        res.json(reservaciones);
    } else {
        res.status(500).json({error: 'No se pudo Actualizar el Espacio'});
    }
});

//Metodo Delete para las Reservaciones 
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(reservaciones, (reserva, i) => {
            if (reserva.id == id) {
                reservaciones.splice(i, 1);
            }
        });
        res.json(reservaciones);
    }
});

module.exports = router;