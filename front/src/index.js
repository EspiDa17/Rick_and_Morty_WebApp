import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

// REACT-ROUTER --> Librería para definir de forma declarativa las vistas 
//                  que queremos renderizar dependiendo la URL
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store.js';

// ReactDOM.render --> Método de REACT que se utiliza para renderizar un 
//                     componente de REACT en el DOM (Document Object Model)
//                     de una página web

// App --> El compoente que se va a renderizar
// document.getElementById('root') --> Elemento del DOM donde se va a renderizar.
//                                     Podemos ver en el archivo index.html que se 
//                                     encuentra en 'public' que tiene un div de 
//                                     id="root"
// BrowserRouter --> Tipo de router que se está usando
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>  
      <App />
    </BrowserRouter>
  </Provider>
  ,document.getElementById('root')
)