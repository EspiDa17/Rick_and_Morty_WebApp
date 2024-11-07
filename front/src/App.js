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
// import Form from './components/Form/Form';
import Favorites from './components/Favorites/Favorites';
import Inicio from './components/Inicio/Inicio.jsx';

//Componente funcional --> Padre
function App () {

  // Me permite ir a rutas
  const location = useLocation();
  const navigate = useNavigate();
  
  //Estado(Memoria) para el componente
  const [characters, setCharacters] = useState([]);

  //Estado de acceso
  const [access, setAccess] = useState(true); //Si voy a ativar nuevamente lo del login debo de ponerlo en false
  
  // Base de datos
  // const username = 'danieles095@outlook.es';
  // const password = '1234';

  // Verifica que el usuario si corresponda al de la base de datos - si corresponde nos lleva a home
  // function login(userData){
  //   if (userData.password === password && userData.username === username) {
  //     setAccess(true);
  //     navigate('/home');
  //   }
  //   else { 
  //     alert ("How are you?")
  //   }
  // }

  // Cuando busco un caracter desde el front me hace un apetición al servidor
  const onSearch = (character) => {
    // Esta es la ruta del serivor 
    fetch(`http://localhost:3006/rickandmorty/onsearch/${character}`)
      .then((response) => response.json())
      .then((data) => {
         if (data.name) {
            console.log(data);
            setCharacters((oldChars) => [...oldChars, data]);
         } else {
            window.alert('No hay personajes con ese ID');
         }
      });
  }

  // REACT - ESTADOS DE LOS COMPONENTES --> Para cambiar o manejar los estados de los componentes
  const onClose = (id) => {
    setCharacters(characters.filter(char => char.id!== id))
  }

  // Se ejecuta cada vez que se monta el componente
  // Si acces esta en false me manda a / -- Al login
  useEffect(() => {
    !access && navigate('/');
  }, [access, navigate]);
  
  return (
    <div className='App' style={{ padding: '10px' }}>
      {/* Si la locacion no es / me muestra navbar */}
      {location.pathname !== '/' && <Navbar onSearch={onSearch}/>}
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
