const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
//Investigacion 1
const https = require('https')
const path = require('path')
const fs = require('fs')
//Para ejecutar Framework de Express
const app = express(); 

//Politicas de CORS
app.use(cors());

//Documentacion Swagger
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "API Parqueo TEC",
        description: "Informacion API Parqueo y Reservaciones",
        contact: {
          name: "Laboratorio 1"
        },
        servers: ["http://localhost:4000"]
      }
    },
    // ['.routes/*.js']
    apis: ["./src/routes/*.js"]
  };

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Investigacion 1 
const sslServer = https.createServer(
    {
    key:fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
    },
    app
);

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
sslServer.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

