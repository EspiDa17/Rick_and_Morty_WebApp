const { saveApiData } = require('../controllers/saveApiData.js'); 

// Se destructura porque es un objeto
const { sequelize } = require('../DB_connection.js');

// Para hacer las peticioes desde el front
const { router } = require('../routes/index.js'); 

// EXPRESS --> Creación de servidores y peticiones a rutas
const express = require('express');
const cors = require('cors'); 

//EXPRESS --> Creo el servidor con express y el puerto donde va a estar
const server = express(); 
const PORT = 3006; 

// Para los métodos del POST
server.use(express.json());
server.use(cors());

// Configuración del cors --> Para que la ruta(3005) haga peticiones desde la APP del front
server.use((req, res, next) => {
    //Autorizo recibir solicitudes de este dominio
    res.header('Access-Control-Allow-Origin', 'http://localhost:3005'); 
    //Autorizo recibir solicitudes que incluyan el encabezado con credenciales
    res.header('Access-Control-Allow-Credentials', true); 
    //Autorizo recibir solicitudes con dichos hedears
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); 
    //Autorizo las solicitudes tipo GET, POST, OPTIONS, PUT y DELETE.
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); 
    next();
 });

// EXPRESS --> 
server.use('/rickandmorty', router)





// SEQUELIZE --> Sincronzación de los modelos a la BD y luego levantamos el servidor
// force: true --> Cuando se baje el back se van a borrar los registros y cuando se vuelva a subir
//                 vamos a tener nuevos campos para agregar
// async await --> Porque 'saveApiData' es asíncrona
sequelize.sync({force: true}).then(async () => {
    
   // Est función se ejecuta de manera asincrónica para hacer el consumo de la API
   // y luego guardar esta información en la BD
   await saveApiData();
    
    // EXPRESS --> 
    // Listen --> Inicia el servidor HTTP y escucha las solicitudes para enviar 
    //            las respectivas respuestas
    server.listen(PORT, () => {
       console.log('El servidor está escuchando por el puerto: ' + PORT);
       console.log("----------------------------------------------------------------");
    });
 })

 //------------------------------------------------------------------------------------------------------------------------
//                                      CONFIGURACIÓN DEL MIDDLEWARE PARA MANEJO DE ERRORES               
//------------------------------------------------------------------------------------------------------------------------
// Este middleware captura los errores que se roducen en el servidor y envía una respuesta de error al cliente con un código de estado y un mensaje correspondientes. Además, muestra el error en la consola del servidor para fines de registro y seguimiento

// Error catching endware.
// Define un middleware en el servidor utilizando la función 'use()' de EXPRESS. El middleware se ejecutará cuando se produzca un error durante el procesamiento de una solicitud.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars

   // Define la variable 'status' que representa el código de estado HTTP que se enviará en la respuesta. El valor se tomará del objeto 'err' si tiene una propiedad 'status', de lo contrario, se establecerá en 500(Internal Server Error)
   const status = err.status || 500;
 
   // Define la variable 'message' que representa el mensaje de error que se enviará en la respuesta. El valor se tomará de la propiedad 'message' del objeto 'err' si está definida, de lo ocntrario, se tomará el objeto 'err' directamente.
   const message = err.message || err;
 
   // Muestra el error en la consola del servidor
   console.error(err);
 
   // Envía una respuesta HTTP al cliente con el código de estado 'status' y el mensaje de error 'message'. La respuesta se envía utilizando los métodos 'status()' y 'send()' de la respuesta 'res' del servidor.
   res.status(status).send(message);
 });

module.exports = { server };