// REDUX - STORE

// Toda la data mantenida por nuestra aplicación tiene que estar contenida en una única
// estructura de datos llamada el "state". Esta estructura se guarda en el "store"

//import { createStore,applyMiddleware, compose} from "redux";
import { createStore,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import  rootReducer  from '../reducer/reducer'
//const composed = compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() )

// createStore --> Crea una Redux Store
//const store=createStore(rootReducer,composed)
const store = createStore(rootReducer,applyMiddleware(thunk))

export default store;



// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from '../reducer/reducer';

// //const composed = compose( window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk))

// // Nuevo
// const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

// // Nuevo
// const middleware = [thunk];

// const store = createStore(
//     rootReducer, 
//     composeEnhancers(applyMiddleware(...middleware))
//     );

// export default store;