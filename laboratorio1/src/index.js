const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
//Para ejecutar Framework de Express
const app = express(); 

//Politicas de CORS
app.use(cors());

//Configuracion 
//Si ya tiene un puerto definido lo toma, si no entonces toma el puerto 4000
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));
//Para soportar los datos que se enviarian (pero no muy pesados como Imagenes)
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Routes
app.use(require('./routes'));
app.use('/api/spaces', require('./routes/spaces'));
app.use('/api/reservations', require('./routes/reservations'));

// Server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

