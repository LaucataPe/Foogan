/* Funcionamiento */ 
import './App.css';
//import {useState, useEffect} from 'react';
//import axios from 'axios';
import { Routes, Route, useLocation } from 'react-router-dom';

/* Vistas*/
import Landing from './components/Landing'
import Home from './components/Home';
import Create from './components/Create';
import CardDetail from './components/CardDetail';
import Nav from './components/NavBar';


function App() {
   const {pathname} = useLocation();
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

