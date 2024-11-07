// CONTROLADOR

// EXPRESS --> Es un framework web para NODE.JS 
// ASYNC AWAIT

const axios = require('axios');

const URL = 'https://rickandmortyapi.com/api/character/';

// Request --> Realiza solicitudes HTTP al servidor
// Response --> Envía las respuestas al cliente
const getCharById = async (req, res) => {
    
    const { id } = req.params;
    console.log('Se solicitó un personaje con el ID --> ' + id);
    
    try {
        // Petición asincrónica a la url de rick and morty buscando un id en particular
        const result = await axios(`${URL}${id}`)
        const characterApi = result.data;
            
        // En caso de que sea exitoso me traigo un arreglo con los datos
        let character = {
            id: characterApi.id,
            image: characterApi.image,
            name: characterApi.name,
            gender: characterApi.gender,
            species: characterApi.species,
            origin: characterApi.origin.name,
            status: characterApi.status
        }
        res.status(200).send(character);
        console.log("Petición realizada correctamente");
        console.log("----------------------------------------------------------------");
    }

    // Si no es exitoso devuelvo la respuesta con el estado 500 y 
    // un mensaje que especifique lo sucedido
    catch(error) {
        console.log("Error 500: ", error.message);
        console.log("----------------------------------------------------------------");
        res.status(500).json({ message: error.message })
    }
}


// NODE JS
module.exports = getCharById;




// PROMESAS

// Realizar una petición por un personaje con el ID

// Realizo una petición con axios a la api de ricky and morty y manejo
// el resultado de la operación con el caso exitoso y el caso fallido

// const axios = require('axios');

// const getCharById = (res, id) => {
    
//     // Petición a la url de rick and morty buscando un id en particular
//     axios(`https://rickandmortyapi.com/api/character/${id}`)
        
//         // En caso de que sea exitoso me traigo un arreglo con los
//         // datos
//         .then(result => result.data)
//         .then(data => {
//             let character = {
//                 id: data.id,
//                 image: data.image,
//                 name: data.name,
//                 gender: data.gender,
//                 species: data.species
//             }

//             // Devuelvo la respuesta con el estado 200 y finalmente 
//             // respondo el objeto del objeto creado en formato JSON
//             res.writeHead(200, {'Content-type':'application/json'})
//             res.end(JSON.stringify(character))
//         })

//         // Si no es exitoso devuelvo la respuesta con el estado 500 y 
//         // un mensaje que especifique lo sucedido
//         .catch(err => {
//             res.writeHead(500, {'Content-type':'text/plain'})
//             res.end(`Character with ${id} ID not found`)
//         })

// }


