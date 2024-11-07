// REACT - COMPONENTE

import React from "react";

// REACT - CSS MODULES - Estilizado desde un archivo css
import styles from './Inicio.module.css'


import { Link } from "react-router-dom";

// REACT - COMPONENTE FUNCIONAL
// COMPONENTE FUNIONAL --> Conceptualmente son como funciones de JS. Aceptan inputs 
//                         arbitrarios (props) y retornan elementos REACT que 
//                         representan lo que debería aparecer en la pantalla
export default function Form (props){

    return (
        <div className={styles.div}>
            <Link className={styles.inicio} to='/home'>Start</Link>
        </div>   
    )
}