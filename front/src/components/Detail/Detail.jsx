// REACT - COMPONENTE

import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// REACT - CSS MODULES - Estilizado desde un archivo css
import styles from './Detail.module.css'

// REACT - COMPONENTE FUNCIONAL
// COMPONENTE FUNIONAL --> Conceptualmente son como funciones de JS. Aceptan inputs 
//                         arbitrarios (props) y retornan elementos REACT que 
//                         representan lo que debería aparecer en la pantalla
export default function Detail(){

    // HOOKS --> Estado local con el nombre character
    //       --> Nos permite tener estado de los componentes
    // Devuelve un valor(character) con estado y una función(setCharacter) para actualizarlo
    // El valor inicial es un objeto vacío
    const [character, setCharacter] = useState({});

    // Nos traemos el id del personaje
    const { detailId } = useParams(); 


    // useEffect --> CICLO DE VIDA DE LOS COMPONENTES
    // Hace la petición del objeto, lo guarda y luego retorna un objeto vacío
    useEffect(() => {
        fetch(`http://localhost:3006/rickandmorty/detail/${detailId}`)
          .then((response) => response.json())
          .then((char) => {
            if (char.name) {
              setCharacter(char);
            } else {
              window.alert("No hay personajes con ese ID");
            }
          })
          .catch((err) => {
            window.alert("No hay personajes con ese ID");
          });
        return setCharacter({});
    }, [detailId]);

    
    return (
        <div className={styles.div}>
            {/* Boton que me devuelve a home */}
            <h1 className={styles.h1}>{character.name}</h1>
            <h2 className={styles.h2}>{character.gender}</h2>
            <h2 className={styles.h2}>{character.origin?.name}</h2>
            <h2 className={styles.h2}>{character.location?.name}</h2> 
            <img className={styles.img} src={character.image} alt='not found'/>    
        </div>
    )
}