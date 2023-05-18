/* Funcionamiento */ 
import './App.css';
import {useEffect} from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { getAllDiets } from "./redux/actions";
import { useDispatch, useSelector } from 'react-redux'

/* Vistas*/
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home';
import Create from './components/Crud/Create';
import Update from './components/Crud/Update';
import CardDetail from './components/Detail/CardDetail';
import Nav from './components/NavBar/NavBar';


function App() {
   const {pathname} = useLocation();
   const dispatch = useDispatch()
   const diets = useSelector((state) => state.diets)

   /*useEffect(() => {
      if (diets.length === 0) {
        dispatch(getAllDiets());
      }
    }, [diets]);*/
   return (
      <>
      {pathname !== '/' && <Nav />}
      <Routes>
         <Route path='/' element={<Landing />}/>
         <Route path='/home' element={<Home />} />
         <Route path='/create' element={<Create />}/>
         <Route path='/update/:id' element={<Update />}/>
         <Route path='/detail/:id' element={<CardDetail />}/>
      </Routes>
      </>
      
   );
}

export default App;

