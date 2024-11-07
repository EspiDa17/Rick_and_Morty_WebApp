// REACT - COMPONENTE

import Card from '../Card/Card';

// REACT - COMPONENTE ESTILIZADO --> Para poder utilizar el estilizado de componentes
import styled from 'styled-components'

// REACT - COMPONENTE ESTILIZADO para el div
const Div = styled.div`
   display: flex;
   flex-wrap: wrap;  
   justify-content: center;
   gap: 16px;  
   padding: 20px;
   max-width: 1000px; 
   margin: auto;
`;
// flex-wrap: wrap - Permite que las cartas pasen a la siguiente fila cuando superen el ancho de la pantalla.
// gap - Espacio entre las cartas.
// max-width - Limitar el ancho máximo del contenedor


// Modificación adicional para ajustar cada carta a un ancho adecuado.
const CardWrapper = styled.div`
   flex: 1 1 150px;  
   max-width: 160px;  
`;
// flex - Define el ancho flexible mínimo de cada carta.
// max-width - Limita el ancho máximo de cada carta para evitar que se expanda demasiado.


// REACT - COMPONENTE FUNCIONAL
// COMPONENTE FUNIONAL --> Conceptualmente son como funciones de JS. Aceptan inputs 
//                         arbitrarios (props) y retornan elementos REACT que 
//                         representan lo que debería aparecer en la pantalla
export default function Cards(props) {
   //Me traigo con destructuring characters de props
   const { characters } = props;
   //window.alert('Voy a renderizar un personaje');
   return ( 
      <Div>
         {/* por cada caracter se va a renderizar una tarjeta */}
         {characters.map(character => (
            <CardWrapper key={character.id}>         
               <Card 
                  key={character.name}
                  name = {character.name}
                  species = {character.species}
                  gender = {character.gender}
                  image = {character.image}
                  status = {character.status}
                  origin = {character.origin?.name}
                  id={character.id}
                  onClose = {props.onClose}
               />
         </CardWrapper>
         ))}
      </Div>
   );
}
