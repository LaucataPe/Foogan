/* Funcionamiento */ 
import './App.css';
import {useEffect, useState} from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { getAllDiets } from "./redux/actions";
import { useDispatch, useSelector } from 'react-redux'

/* Vistas*/
import Landing from './components/Landing'
import Home from './components/Home';
import Create from './components/Create';
import CardDetail from './components/CardDetail';
import Nav from './components/NavBar';


function App() {
   const {pathname} = useLocation();
   const [showFilters, setShowFilters] = useState(false);
   const dispatch = useDispatch()
   const diets = useSelector((state) => state.diets)

   useEffect(() => {
      if(diets.length === 0)dispatch(getAllDiets());
   }, []);
   return (
      <>
      {pathname !== '/' && <Nav setShowFilters={setShowFilters} />}
      <Routes>
         <Route path='/' element={<Landing />}/>
         <Route path='/home' element={<Home showFilters={showFilters}/>} />
         <Route path='/create' element={<Create />}/>
         <Route path='/detail/:id' element={<CardDetail />}/>
      </Routes>
      </>
      
   );
}

export default App;

