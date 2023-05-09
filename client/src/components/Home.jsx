import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllRecipes } from "../redux/actions";
import { useLocation } from 'react-router-dom';

/*Vistas*/
import Pagination from './Pagination'
import Filters from './Filters'


function Home() {
    const {pathname} = useLocation();
    const [loading, setLoading] = useState(false)
    const recipes = useSelector((state) => state.recipes)
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(false)
        dispatch(getAllRecipes())
        setLoading(true)
    }, [])
            
    
    return(
        <>
        <h1>This is the home </h1>
        {pathname === '/home/filters' && <Filters/>} 
        <Pagination recipes={recipes} loading={loading}/>
        <Link to='/'><button>Back</button></Link>
        </>
    )
}

export default Home