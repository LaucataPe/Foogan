import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllRecipes } from "../../redux/actions";
import styles from './Home.module.css'
//import { useLocation } from 'react-router-dom';

/*Vistas*/
import Pagination from './Pagination'
import Filters from '../Filters/Filters'

function Home() {
    const [loading, setLoading] = useState(false)
    const recipes = useSelector((state) => state.recipes)
    const allRecipes = useSelector((state) => state.allRecipes)
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(false)
        if(allRecipes.length === 0)dispatch(getAllRecipes())
        setLoading(true)
    }, [])

       
    return(
        <>
        <h1 className={styles.title}>Look for your favourite recipes!</h1>
        <hr />
        <Filters />
        <Pagination recipes={recipes} loading={loading}/>
        </>
    )
}

export default Home