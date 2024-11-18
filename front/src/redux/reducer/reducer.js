import { DELETE_FAVORITE, ADD_FAVORITE, FILTER, ORDER } from "../actions/types.js";

const initialState = {
  allCharacters: [],
  myFavorites: [],
};

// REDUX - REDUCER
// Funciones puras, que toman el estado anterior y una acción y retornan 
// el nuevo estado. El reducer no cambia el estado, si no que devuelve 
// un estado nuevo

// state --> Guarda toda la información de nuestra app
// type, payload --> Acción 
function rootReducer(state = initialState, { type, payload, action }) {
  switch (type) {
    

    case ADD_FAVORITE:
      return {
        ...state,
        myFavorites: [...state.myFavorites, payload],
      };


    case DELETE_FAVORITE:
        // Filtrar los favoritos en el estado global eliminando el personaje con el id dado
        return {
            ...state,
            myFavorites: state.myFavorites.filter(fav => fav.id !== payload)
      };



    case FILTER:
      const filterCopy = [...state.allCharacters];
      const filterGender = filterCopy.filter((char) => char.gender === payload);
      return {
        // Spread operator --> Devuelve una copia del estado
        ...state,
        myFavorites: filterGender,
      };



    case ORDER:
      const orderCopy = [...state.allCharacters];
      console.log(state.allCharacters);
    
      const order = orderCopy.sort((a, b) => {
        if (a.id > b.id) {
          return payload === "Ascendente" ? 1 : -1;
        }
        if (a.id < b.id) {
          return payload === "Ascendente" ? -1 : 1;
        }
        return 0; // Manejo del caso en el que a.id === b.id
      });
    
      return {
        // Spread operator --> Devuelve una copia del estado
        ...state,
        myFavorites: order,
      };



    case "GET_FAVORITE":
      return{
        // Spread operator --> Devuelve una copia del estado
        ...state,
        allCharacters:payload,
        myFavorites:payload
      };



    case "CLEAR_FAVORITES":
      return {
        ...state,
        myFavorites: [], // Limpia el estado de favoritos
      };
    
    
    default:
      return state;
  }
}
export default rootReducer;