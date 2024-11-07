// REACT - COMPONENTE

import React from "react";

// REACT - CSS MODULES - Estilizado desde un archivo css
import styles from './About.module.css'

// REACT - COMPONENTE FUNCIONAL
// COMPONENTE FUNIONAL --> Conceptualmente son como funciones de JS. Aceptan inputs 
//                         arbitrarios (props) y retornan elementos REACT que 
//                         representan lo que debería aparecer en la pantalla
export default function About(){
    return (
        <div>
            <br/>
            <br/>
            <br/>
            <h1 className={styles.letter}> Hi, i am Daniel Espinal Gil</h1>
            <br/>
            <h2 className={styles.letter}>I will be a Full Stack Web Developer</h2>
            <h2 className={styles.letter}>This is my first web application </h2>
            <h2 className={styles.letter}>using JavaScript, HTML, CSS and React</h2>
        </div>
    )
}