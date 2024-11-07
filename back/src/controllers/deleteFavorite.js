// CONTROLADOR

// EXPRESS --> Es un framework web para NODE.JS 
// ASYNC AWAIT

// SEQUELIZE --> Requiero conectarme con la BD con e modelo "Favorite"
const { Favorite } = require("../DB_connection.js");

// Request --> Realiza solicitudes HTTP al servidor
// Response --> Envía las respuestas al cliente
const deleteFavorite = async (req, res) => { 
    console.log("Se acaba de hacer la petición deleteFavorite al servidor");

    try {
        const { id } = req.params;
        const favoriteDeleted = await Favorite.findByPk(id);
        if(!favoriteDeleted) return console.log("Petición realizada correctamente"); console.log("----------------------------------------------------------------"); res.status(404).json({message: `There is not character with id ${id}`})

        // SI el favorito se borra correctamente
        favoriteDeleted.destroy();
        return res.status(200).json({message: 'Favorite deleted successfully'});

    } catch (error) {
        console.log("Error 404: No se encuentra el recurso pedido");
        console.log("----------------------------------------------------------------");
        return res.status(404).json({message: error.message});
    }
}

// NODE JS
module.exports = deleteFavorite;