import { useState, useEffect } from 'react'
import './App.css'

// REACT-ROUTER --> Librería para definir de forma declarativa las vistas 
//                  que queremos renderizar dependiendo la URL
import { useLocation, useNavigate, Routes, Route } from 'react-router-dom'
import Cards from './components/Cards/Cards.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import Error from './components/Error/Error';
import Favorites from './components/Favorites/Favorites';
import Inicio from './components/Inicio/Inicio.jsx';

//Componente funcional --> Padre
function App () {

  // Me permite ir a rutas
  const location = useLocation();
  const navigate = useNavigate();
  
  //Estado(Memoria) para el componente
  const [favoritesCleared, setFavoritesCleared] = useState(false);
  const [characters, setCharacters] = useState([]);

  //Estado de acceso
  const [access] = useState(true); //Si voy a ativar nuevamente lo del login debo de ponerlo en false


  // Función para buscar un personaje por ID y actualizar el estado
  const onSearch = async (characterId) => {
    try {
      const response = await fetch(`http://localhost:3006/rickandmorty/onsearch/${characterId}`);
      if (!response.ok) throw new Error("No se encontró el personaje");
      const character = await response.json();

      // Evitar personajes duplicados
      if (characters.find((char) => char.id === character.id)) {
        alert("El personaje ya fue agregado");
        return;
      }
      setCharacters((prevChars) => [...prevChars, character]);
    } catch (error) {
      console.error(error.message);
    }
  };


  // Función para limpiar el estado de los personajes
  const clearCharacters = () => {
    setCharacters([]);
  };


  // REACT - ESTADOS DE LOS COMPONENTES --> Para cambiar o manejar los estados de los componentes
  const onClose = (id) => {
    setCharacters(characters.filter(char => char.id!== id))
  }


  // Se ejecuta cada vez que se monta el componente
  // Si acces esta en false me manda a / -- Al login
  useEffect(() => {
    // Si no hay acceso, redirigir al login
    if (!access) {
      navigate('/');
  } else if (!favoritesCleared) {
      // Ejecutar la petición solo si no se ha limpiado aún
      fetch('http://localhost:3006/rickandmorty/deleteFavorites')
          .then(response => {
              if (!response.ok) {
                  throw new Error('Error al borrar el archivo de favoritos');
              }
              return response.json();
          })
          .then(data => {
              console.log(data.message); // Mensaje de confirmación
              setFavoritesCleared(true); // Marcar como limpiado
          })
          .catch(error => {
              console.error('Error:', error); // Manejo de errores
          });
  }
}, [access, navigate, favoritesCleared]);
  
  return (
    <div className='App' style={{ padding: '10px' }}>
      {/* Si la locacion no es / me muestra navbar */}
      {location.pathname !== '/' && <Navbar onSearch={onSearch} onLogOut={clearCharacters}/>}
      <Routes>
        {/* exact --> Cuando es solo barra */}
        {/* <Route exact path='/' element={<Form login={login}/>}/> */}
        <Route exact path='/' element={<Inicio/>}/>
        <Route path='/home' element={<Cards characters={characters} onClose={onClose}/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/favorites' element={<Favorites/>}/>
        <Route path='/detail/:detailId' element={<Detail/>}/>
        {/* '*' --> Cuando ingresan a una ruta que no está definida */}
        <Route path='*' element={<Error/>}/>
      </Routes>
    </div>
  )
}

export default App
