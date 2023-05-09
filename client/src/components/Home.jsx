import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllRecipes } from "../redux/actions";

/*Vistas*/
import Pagination from './Pagination'


function Home() {
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
        <Pagination recipes={recipes} loading={loading}/>
        <Link to='/'><button>Back</button></Link>
        </>
    )
}

export default Home