// REDUX --> Herramienta para la gestión de estados de nuestros componentes
// ACCIONES --> Nos define que hacer (opcionalmente con argumentos)

import { DELETE_FAVORITE, ADD_FAVORITE, FILTER,ORDER } from "./types.js";
import axios from 'axios'

// Agregar un personaje a favoritos
export function addFavorite (fav) { 
  return async function (dispatch){
    try {
      // Petición para agregar un caracter enviando el id
      let chart = await axios.post('http://localhost:3006/rickandmorty/fav', fav);
      console.log(chart.data)
      console.log("pasamos por action creator despues de la reques")
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
export const deleteFavorite = (id) => {
    return async function (dispatch) {
      try {
        // Petición para borrar un caracter enviando el id
        const chartDelete = await axios.delete(`http://localhost:3006/rickandmorty/fav/${id}`);
        console.log(chartDelete.data)
        // dispatch --> No retorna nada, simplemente recibe una acción e invoca
        //              al reducer con el estado actual y la acción, y actualiza
        //              el estado con lo que retorna el reducer (el nuevo estado)
        dispatch({ 
          type: DELETE_FAVORITE,
          payload: id,
        });
      }
      catch (error) {
        console.log("error")
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