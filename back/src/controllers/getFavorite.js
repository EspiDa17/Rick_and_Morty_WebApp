// CONTROLADOR

// EXPRESS --> Es un framework web para NODE.JS 
// ASYNC AWAIT

// SEQUELIZE --> Requiero conectarme con la BD con e modelo "Favorite"
const { Favorite } = require("../DB_connection.js");

// Request --> Realiza solicitudes HTTP al servidor
// Response --> Envía las respuestas al cliente
const getFavorite = async (req, res) => {
    try {
        // Realizo la consulta para traerme los favoritos
        const favorites = await Favorite.findAll();
        
        if(!favorites.length) {
            return res.status(404).json({message: 'No favorites yet'}) 
        }
        else {
            return res.status(200).json(favorites);
        }
    }
    catch(error) {
        return res.status(404).json({error:error.message})
    }
}

// NODE JS
module.exports = getFavorite;