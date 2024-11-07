// REACT - COMPONENTE

import React from "react";
import SearchBar from "../SearchBar/SearchBar";

// REACT - CSS MODULES - Estilizado desde un archivo css
import style from './Navbar.module.css'

import { Link } from "react-router-dom";

// REACT - COMPONENTE FUNCIONAL padre de SearchBar
// COMPONENTE FUNIONAL --> Conceptualmente son como funciones de JS. Aceptan inputs 
//                         arbitrarios (props) y retornan elementos REACT que 
//                         representan lo que debería aparecer en la pantalla
export default function Navbar({ onSearch }){
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
            <Link className={style.logOut} to='/'>LogOut</Link>
            <SearchBar onSearch={onSearch}/>
        </div>
    )
}