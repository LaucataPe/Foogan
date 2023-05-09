/* Funcionamiento */ 
import './App.css';
//import {useState, useEffect} from 'react';
//import axios from 'axios';
import { Routes, Route, } from 'react-router-dom';

/* Vistas*/
import Landing from './components/Landing'
import Home from './components/Home';
import Create from './components/Create';
import CardDetail from './components/CardDetail';


function App() {
 
   return (
      <>
      {/* {pathname !== '/' && <Nav onSearch={onSearch} />} */}
      <Routes>
         <Route path='/' element={<Landing />}/>
         <Route path='/home' element={<Home />} />
         <Route path='/create' element={<Create />}/>
         <Route path='/detail/:id' element={<CardDetail />}/>
      </Routes>
      </>
      
   );
}

export default App;

