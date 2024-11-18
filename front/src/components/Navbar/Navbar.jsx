// REACT - COMPONENTE

import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { clearFavorites } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";

// REACT - CSS MODULES - Estilizado desde un archivo css
import style from './Navbar.module.css'

import { Link, useNavigate } from "react-router-dom";

// REACT - COMPONENTE FUNCIONAL padre de SearchBar
// COMPONENTE FUNIONAL --> Conceptualmente son como funciones de JS. Aceptan inputs 
//                         arbitrarios (props) y retornan elementos REACT que 
//                         representan lo que debería aparecer en la pantalla
export default function Navbar({ onSearch, onLogOut }){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogOut = async () => {
        try {
            // Hacer la petición para borrar los favoritos
            const response = await fetch('http://localhost:3006/rickandmorty/deleteFavorites');
            if (!response.ok) {
                throw new Error('Error al borrar los favoritos');
            }
            const data = await response.json();
            console.log(data.message);

            // Limpiar el estado global de Redux
            dispatch(clearFavorites());

            // Limpia el estado de personajes y redirige al usuario
            onLogOut(); // Llama a la función que limpia los personajes
            
            // Redirigir al usuario al logout (o página principal)
            navigate('/');
        } catch (error) {
            console.error('Error al intentar hacer logout:', error);
        }
    };

    return (
        <div className={style.container}>
            {/* <Link/> --> se traduce a un tag <a> que nos va a permitir redireccionar al usuario hacia un anueva URL*/}
            {/* to -->  Nos indica el path hacia el cual debemos redirigir una vez clickeado el link*/}
            <Link className={style.home} to='/home'>Home</Link>
            <b>|</b>
            <Link className={style.about} to='/about'>About</Link>
            <b>|</b>
            <Link className={style.favorites} to='/favorites'>Favorites</Link>
            <b>|</b>
            <button className={style.logOut} onClick={handleLogOut}>LogOut</button>
            <SearchBar onSearch={onSearch}/>
        </div>
    )
}