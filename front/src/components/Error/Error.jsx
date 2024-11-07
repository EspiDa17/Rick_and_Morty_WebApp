// REACT - COMPONENTE

import React from "react";

// REACT - COMPONENTE FUNCIONAL
// COMPONENTE FUNIONAL --> Conceptualmente son como funciones de JS. Aceptan inputs 
//                         arbitrarios (props) y retornan elementos REACT que 
//                         representan lo que debería aparecer en la pantalla
export default function Error(){
    return (
        <div>
            <h1>Error 404</h1>
            <h2>Rute not found</h2>
        </div>
    )
}