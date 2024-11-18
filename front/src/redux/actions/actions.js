// REDUX --> Herramienta para la gestión de estados de nuestros componentes
// ACCIONES --> Nos define que hacer (opcionalmente con argumentos)

import { DELETE_FAVORITE, ADD_FAVORITE, FILTER, ORDER } from "./types.js";
import axios from 'axios'

// Agregar un personaje a favoritos
export function addFavorite (fav) { 
  return async function (dispatch){
    try {
      // Petición para agregar un caracter enviando el id
      let chart = await axios.post('http://localhost:3006/rickandmorty/fav', fav);
      console.log(chart.data)
      console.log("Se ejecutó addfavorite en actions.js")
      // dispatch --> No retorna nada, simplemente recibe una acción e invoca
      //              al reducer con el estado actual y la acción, y actualiza
      //              el estado con lo que retorna el reducer (el nuevo estado)
      dispatch({ 
        type: ADD_FAVORITE,
        payload: chart.data
      });
    } 
    catch (error) {
      console.log("error")
    }
  }
}


// Eliminar un caracter de favoritos
export function deleteFavorite (id) {
    return async function (dispatch) {
      try {
        console.log("Se ejecutó deletefavorite en actions.js")
        // Petición para borrar un caracter enviando el id
        // Realiza una petición DELETE al servidor para eliminar el favorito por ID
        const updatedFavorites = await axios.delete(`http://localhost:3006/rickandmorty/fav/${id}`);
        console.log("Favorito eliminado correctamente", updatedFavorites.data);
        // dispatch --> No retorna nada, simplemente recibe una acción e invoca
        //              al reducer con el estado actual y la acción, y actualiza
        //              el estado con lo que retorna el reducer (el nuevo estado)
        dispatch({ 
          type: DELETE_FAVORITE,
          payload: id, // El backend retorna la lista actualizada
        });
      }
      catch (error) {
        console.error("Error al eliminar el favorito:", error);
      }
    }
  }


export function filterCards(status){
  return{
    type:FILTER,
    payload:status
  }
}

export function orderCards(id){
  return {
    type:ORDER,
    payload:id
  }
}

export function getFavorites(){
  return async function (dispatch){
    try {
      console.log("Se ejecutó getfavorites en actions.js")
      // Petición para obtener los caracteres favoritos
      const character = await axios.get(`http://localhost:3006/rickandmorty/fav`)
      // dispatch --> No retorna nada, simplemente recibe una acción e invoca
      //              al reducer con el estado actual y la acción, y actualiza
      //              el estado con lo que retorna el reducer (el nuevo estado)
      return dispatch ({
        type: "GET_FAVORITE",
        payload: character.data
      })
    }
    catch (error) {
      console.log(error);
    }
  }
}

export function clearFavorites() {
  return {
    type: "CLEAR_FAVORITES",
  };
}