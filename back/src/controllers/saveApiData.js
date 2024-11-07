// CONTROLADOR

// EXPRESS --> Es un framework web para NODE.JS 
// ASYNC AWAIT

// PARA CONSEGUIR LOS PRIMEROS 100 PERSONAJES DE LA API

const axios = require('axios');

// SEQUELIZE --> Requiero conectarme con la BD con e modelo "Character"
const { Character } = require('../DB_connection.js')

// SIEMPRE QUE CONSULTEMOS A BASES DE DATOS O HAGAMOS PETICIONES A API's
// HAY PROMESAS --> FUNCIONES ASINCRONAS


// Esta función hace una request a la API de R&M y obtiene los primeros 100 personajes
const getApiData = async () => {

    try {

        // Variable para almacenar los 100 personajes que treremos de la API
        let allCharactersInfoApi = [];
        for(let i=1 ; i<6 ; i++){
            const apiData = await axios(`https://rickandmortyapi.com/api/character?page=${i}`)
            allCharactersInfoApi.push(apiData);
        }
        
        // Promesas --> Representa la eventual finalización o falla de una operación sincrónica
        //              y su valor resultante.
        // Promise.all --> Devuelve una promesa que termina correctamente cuando todas las promesas
        //                 en el argumento iterable(allCharactersInfoApi) han sido concluidas con exito
        allCharactersInfoApi = await Promise.all(allCharactersInfoApi);
        
        // .data.results --> Necesito acceder hasta acá para acceder a la info que necesito de cada caracter
        // map --> Solo necesito traerme 7 propiedades de los personajes
        let allCharactersInfoApi2 = allCharactersInfoApi.map(response => response.data.results.map(charac => {
            return {
                id: charac.id,
                name: charac.name,
                species: charac.species,
                status: charac.status,
                origin: charac.origin.name,
                gender: charac.gender,
                image: charac.image
            }
        }))
        //console.log('Esto es la nueva info: ', allCharactersInfoApi2);

        // Como en el momento me está llegando un arreglo de arreglos con 20 objetos cada uno
        // Necesito que todos los objetos me queden en un solo arreglo
        // .flat --> Si hay varios arreglos anidados los saca a un solo arreglo
        let allCharacters = allCharactersInfoApi2.flat();
        //console.log('Esta es la respuesta: ', allCharacters);
        return allCharacters; 

    } catch (error) {
        return {error: error.message}
    }

}

//getApiData()

// Es para guardar la info que trea la función 'getApiData' en la BD
// Esta función es asíncrona porque espera a que se ejecute le función 'getApiData'
const saveApiData = async () => {
    try {
        
        const characterAll = await getApiData();

        // Método asíncrono
        // bulkCreate --> Agregar todos(100) los personajes a la BD
        await Character.bulkCreate(characterAll);
        console.log('Se realizó el registro en la BD');
        console.log("----------------------------------------------------------------");

    } 
    catch (error) {
        console.log('Hubo un problema al cargar en la BD');
        console.log("----------------------------------------------------------------");
        return {error: error.message};
    }
}

// NODE JS
module.exports = {
    saveApiData
};