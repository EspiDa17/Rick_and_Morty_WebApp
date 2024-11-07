// REACT - COMPONENTE

import { useState } from 'react';

// REACT - CSS MODULES - Estilizado desde un archivo css
import style from './SearchBar.module.css'


// REACT - COMPONENTE FUNCIONAL
// COMPONENTE FUNIONAL --> Conceptualmente son como funciones de JS. Aceptan inputs 
//                         arbitrarios (props) y retornan elementos REACT que 
//                         representan lo que debería aparecer en la pantalla
export default function SearchBar(props) {

   // HOOKS --> Nos permite tener estado de los componentes
   // Devuelve un valor(character) con estado y una función(setCharacter) para actualizarlo
   //Estado(Memoria)
   const [character, setCharacter] = useState('');

   // REACT - ESTADOS DE LOS COMPONENTES - Función que me setea el estado
   const handleChange = (e) => {
      //Opción 1:
      // setCharacter({
      //    character: e.target.value
      // })

      //Opción 2:
      const { value } = e.target
      setCharacter(value)
   }

   return (
      <div>
         <input className={style.input} type='search' placeholder='Search character' onChange={handleChange}/>
         <button className={style.button} onClick={() => props.onSearch(character)}>Add</button>
      </div>
   );
}
