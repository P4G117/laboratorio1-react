const { Router } = require('express');
const router = new Router();
const express = require('express')

const spaces = require('../datos.json');

const _ = require("underscore");


//Metodo Get de todos los Espacios
/**
 * @swagger
 * /api/spaces?page=2&limit=3:
 *  get:
 *    description: Use to request all Spaces
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', (req, res) => {
    //Laboratorio 1 - Paginacion Espacios
    const page = req.query.page
    const limit = req.query.limit

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const resultSpaces = spaces.slice(startIndex, endIndex)

    res.json(resultSpaces); //Retorna todos los Espacios del Parqueo
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
/**
 * @swagger
 * /spaces:
 *  put:
 *    description: Use to update a Space
 *    responses:
 *      '200':
 *        description: A successful response
 */
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