// REACT - COMPONENTE

import { connect, useDispatch } from "react-redux"
import Card from "../Card/Card"
import { useEffect } from "react";

// REACT - CSS MODULES - Estilizado desde un archivo css
import styles from './Favorites.module.css'
import { orderCards, filterCards, getFavorites } from '../../redux/actions/actions.js'

// REACT - COMPONENTE FUNCIONAL
// COMPONENTE FUNIONAL --> Conceptualmente son como funciones de JS. Aceptan inputs 
//                         arbitrarios (props) y retornan elementos REACT que 
//                         representan lo que debería aparecer en la pantalla
export function Favorites ({ myFavorites }){

    const dispatch = useDispatch();
    
    useEffect(() => {
        console.log("useEffect");
        dispatch(getFavorites());
    }, [dispatch]);
    

    // REACT - ESTADOS DE LOS COMPONENTES
    const handleDispatch = (e) => {
        //Me trae el nombre y el valor de los selects
        const { name, value } = e.target;
        
        // Si el nombre del select es order despacho la acción con el value
        if(name === 'order'){
            return dispatch(orderCards(value))
        }

        if(name === 'filter'){
            return dispatch(filterCards(value))
        }
    }



    return (
        <div className={styles.div1}>
            <div className={styles.div2}>
                {/* los selects deben tener un nombre */}
                <select className={styles.select1} name='order' onChange={handleDispatch}>
                    <option value='Ascendente'>Ascendente</option>
                    <option value='Descendente'>Descendente</option>
                </select >
                
                <select className={styles.select1} name='filter' onChange={handleDispatch}>
                <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Genderless'>Genderless</option>
                    <option value='Unknown'>Unknown</option>
                </select>
            
            </div>
            <div className={styles.cardContainer}>
                { myFavorites.length ? myFavorites.map(fav => ( //Si hay algún personaje favorito agregado
                    
                    <Card
                        key={fav.id}    
                        name={fav.name}
                        id={fav.id}
                        species={fav.species}
                        gender={fav.gender}
                        image={fav.image} 
                        isFavoriteView={true}  // Esta prop indicará que estamos en el modo "favoritos"                              
                    />
                    )) : //Si no hay personajes favoritos agrgados
                    (<div className={styles.div3}>
                        <h1 className={styles.let}>
                            No se han agregado
                            personajes favoritos
                        </h1>
                    </div>)
                }
            </div>        
        </div>
    )
}

export function mapStateToProps(state){
    return {
        myFavorites: state.myFavorites,
    }
}

export default connect(mapStateToProps, null)(Favorites)