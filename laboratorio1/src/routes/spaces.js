const { Router } = require('express');
const router = new Router();

const spaces = require('../datos.json');

const _ = require("underscore");
//Metodo Get de todos los Espacios
router.get('/', (req, res) => {
    res.json(spaces); //Retorna todos los Espacios del Parqueo
});

//Metodo Get por ID 
router.get('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(spaces, (space, i) => {
            if (space.id == id) {
                
                res.json(space); //Retorna Informacion Solicitada
            }
        });    
    }else {
        res.status(500).json({error: 'Dato no Valido'});
    }
});

//Metodo Post para los Espacios
router.post('/', (req, res) => {
    const id = spaces.length + 1;
    const { state, number, parking} = req.body;
    const newSpace = { ...req.body, id };
    if (id && state && number && parking ) {
        spaces.push(newSpace);
        res.json(spaces);
    } else {
        res.status(500).json({error: 'Los datos no son validos'});
    }
});

//Metodo Put para los Espacios
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { state, number, parking } = req.body;
    if (id && state && number && parking) {
        _.each(spaces, (space, i) => {
            if (space.id === id) {
                space.state = state;
                space.number = number;
                space.parking = parking;
            }
        });
        res.json(spaces);
    } else {
        res.status(500).json({error: 'No se pudo Actualizar el Espacio'});
    }
});

//Metodo Delete para los Espacios 
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(spaces, (space, i) => {
            if (space.id == id) {
                spaces.splice(i, 1);
            }
        });
        res.json(spaces);
    }
});

module.exports = router;