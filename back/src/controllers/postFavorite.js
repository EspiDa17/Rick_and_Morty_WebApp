// CONTROLADOR

// EXPRESS --> Es un framework web para NODE.JS 
// ASYNC AWAIT

// SEQUELIZE --> Requiero conectarme con la BD con e modelo "Favorite"
const { Favorite } = require('../DB_connection.js');

// Request --> Realiza solicitudes HTTP al servidor
// Response --> Envía las respuestas al cliente
const postFavorite = async (req, res) => {
    console.log("Se acaba de hacer la petición postFavorite al servidor");
    
    try {
        const { id, name, status, species, gender, origin, image } = req.body;

        if(!id || !name || !status || !species || !gender || !origin || !image) {
            console.log("faltan datos en el cuerpo de la petición");
            console.log("----------------------------------------------------------------");
            return res.status(404).json({message: 'Complete all fields'})
        }
        
        else {
            const favorite = await Favorite.create({
                id,
                name,
                status,
                species,
                gender,
                origin,
                image
            })
            console.log("Petición realizada correctamente");
            console.log("----------------------------------------------------------------");
            return res.status(200).json({message: 'Petición correcta'})
        }
    }
    catch(error) {
        console.log("Error 404: No se encuentra el recurso pedido");
        console.log("----------------------------------------------------------------");
        return res.status(404).json({message: error.message})
    }
}


// NODE JS
module.exports = postFavorite;