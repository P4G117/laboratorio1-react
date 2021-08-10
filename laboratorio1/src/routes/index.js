const { Router } = require('express');

const router = new Router();

//Pagina Principal 
router.get('/test', (req, res) => {
    const data = {
        curso: 'SOA',
        lab: 'Laboratorio1'
    };
    res.json(data);
});  

module.exports = router;