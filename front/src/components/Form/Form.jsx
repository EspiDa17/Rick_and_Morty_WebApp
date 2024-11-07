// REACT - COMPONENTE

import React from "react";
import validation from "./validation";

// REACT - CSS MODULES - Estilizado desde un archivo css
import styles from './Form.module.css'

// REACT - COMPONENTE FUNCIONAL
// COMPONENTE FUNIONAL --> Conceptualmente son como funciones de JS. Aceptan inputs 
//                         arbitrarios (props) y retornan elementos REACT que 
//                         representan lo que debería aparecer en la pantalla
export default function Form (props){

    // HOOKS --> Nos permite tener estado de los componentes
    // Devuelve un valor(userData) con estado y una función(setUserData) para actualizarlo
    const [userData, setUserData] = React.useState({
        username: '',
        password: ''
    })

    // HOOKS
    // Devuelve un valor(character) con estado y una función(setCharacter) para actualizarlo
    const [errors, setErrors] = React.useState({
        username: '',
        password: ''
    })

    // REACT - ESTADOS DE LOS COMPONENTES - Función para setear el estado
    const handleInputChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })

        setErrors(
            validation({
                ...userData,
                [e.target.name]: e.target.value
            })
        )
    }

    // ESTADOS DE LOS COMPONENTES
    const handleSubmit = (e) => {
        // Para que no actualice
        e.preventDefault();

        // Al parecer utiliza la función "login" que está en App.js que es la que valida 
        // si el usuario y la clave son correctos para dar paso a la ruta /home
        props.login(userData);
    }

    return (
        <div className={styles.div}>
            {/* onSubmit --> Atributo es la acción que se tomará cuando se envíe el formulario */}
            {/*              En este caso ejecuta la función "handleSubmit" */}
            <form onSubmit={handleSubmit}>
                <br/>
                {/* <label className={styles.lavel} >Username: </label> */}
                <input type='text' name='username' value={userData.username} onChange={handleInputChange} placeholder='User Name' className={styles.input}/>
                
                <p className={styles.danger}>{errors.username}</p>

                {/* <label className={styles.lavel} >Password: </label> */}
                
                
                <input type='password' name='password' value={userData.password} onChange={handleInputChange} placeholder='Password' className={styles.input}/>
                
                <p className={styles.danger}>{errors.password}</p>

                <button className={styles.button} type='submit'>LOGIN</button>
            </form>
        </div>   
    )
}