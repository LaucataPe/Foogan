/* Funcionamiento */ 
import './App.css';
import {useEffect} from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { getAllDiets } from "./redux/actions";
import { useDispatch } from 'react-redux'

/* Vistas*/
import Landing from './components/Landing'
import Home from './components/Home';
import Create from './components/Create';
import CardDetail from './components/CardDetail';
import Nav from './components/NavBar';


function App() {
   const {pathname} = useLocation();
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getAllDiets());
   }, []);
   return (
      <>
      {pathname !== '/' && <Nav/>} 
      <Routes>
         <Route path='/' element={<Landing />}/>
         <Route path='/home' element={<Home />} />
         <Route path='/home/filters' element={<Home />} />
         <Route path='/create' element={<Create />}/>
         <Route path='/detail/:id' element={<CardDetail />}/>
      </Routes>
      </>
      
   );
}

export default App;

