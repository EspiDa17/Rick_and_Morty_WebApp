// REACT - COMPONENTE
//Me va a renderizar solo una card


import { Link } from 'react-router-dom';

// REACT - CSS MODULES - Estilizado desde un archivo css
import styles from './Card.module.css'

import { addFavorite, deleteFavorite } from '../../redux/actions/actions'
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';


// REACT - COMPONENTE FUNCIONAL Hijo -- Padre Cards
// COMPONENTE FUNIONAL --> Conceptualmente son como funciones de JS. Aceptan inputs 
//                         arbitrarios (props) y retornan elementos REACT que 
//                         representan lo que debería aparecer en la pantalla
export function Card(props) {
   

   // HOOKS --> Nos permite tener estado de los componentes
   // Devuelve un valor(isFav) con estado y una función(setIsFav) para actualizarlo
   //Estado local
   const [isFav, setIsFav] = useState(false);
   // const [isFav, setIsFav] = [false, f()]
   // isFav = false, setIsFvav = f(){}

   // REACT - ESTADOS DE LOS COMPONENTES
   function handleFavorite(){
      if(isFav){
         setIsFav(false);
         props.deleteFavorite(props.id);
      }
      else{
         setIsFav(true);
         const character = {
            key: props.id,
            id: props.id,
            name: props.name,
            status: props.status,
            species: props.species,
            gender: props.gender,
            origin: props.origin?.name || "Unknown", // Extrae solo el nombre de origin
            image: props.image
         };
         console.log("Voy a eniar el siguiente body para la petición: ", character);
         
         props.addFavorite(character);
      }
   }

   // CICLO DE VIDA DEL COMPONENTE
   // Se ejecuta cuando en el componente haya una actualización en props.myFavorites
   useEffect(() => {
      // Si hay algo en favoritos haga el forEach, 
      props.myFavorites?.forEach((fav) => {
         // Si el id de lo que está en favoritos coincide con el id que viene por props setea en true el estado isFav
         if (fav.id === props.id) {
            setIsFav(true);
         }
      });
   }, [props.myFavorites, props.id]);

   return (
      <div className={styles.div}>
         <div className={styles.div2}>
            {!props.isFavoriteView && (
               <>
                  {isFav ? (
                     <button className={styles.button0} onClick={handleFavorite}>❤️</button>
                  ) : (
                     <button className={styles.button0} onClick={handleFavorite}>🤍</button>
                  )}
                  
                  {/* onClose es una funcion que viene por props y que tiene que ejecutarse*/}
                  <button className={styles.button1} onClick={() => props.onClose(props.id)}>X</button>
               </>
            )}
            <br/>
         </div>
         
         {/* <Link/> --> se traduce a un tag <a> que nos va a permitir redireccionar al usuario hacia un anueva URL*/}
         {/* to -->  Nos indica el path hacia el cual debemos redirigir una vez clickeado el link*/}
         <Link to={`/detail/${props.id}`}>
            <button className={styles.button2}>{props.name}</button>
         </Link>
         <h2 className={styles.h1}>{props.species}</h2>
         <h2 className={styles.h1}>{props.gender}</h2>
         <img className={styles.img} src={props.image} alt="img not found" />
      </div>
   );
}


// Me proporciona los parametros para agregar o eliminar 
export function mapDispatchToProps(dispatch){
   return {
      addFavorite: function(fav){
         dispatch(addFavorite(fav))
      },

      deleteFavorite: function(id){
         dispatch(deleteFavorite(id))
      }
   }
}

export function mapStateToProps(state){
   return {
      myFavorites: state.myFavorites,
   }
}


// Si no vamos a traernos el estado , null el primer parámetro
export default connect(mapStateToProps, mapDispatchToProps)(Card);
