const { Router } = require('express');
const router = new Router();

const reservaciones = require('../reserva.json');

const _ = require("underscore");

//Metodo Get de todas los Reservaciones
router.get('/', (req, res) => {
    res.json(reservaciones);
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