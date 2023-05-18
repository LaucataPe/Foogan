import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllRecipes } from "../../redux/actions";
import styles from './Home.module.css'
//import { useLocation } from 'react-router-dom';
import images from '../../img/index'

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
        <div className={styles.home}>
            <div className={styles.info}>
                <h1 className={styles.title}>Look for your <span>favourite</span> recipes!</h1>
                <p>Discover delicious recipes for every taste and dietary preference. Find your perfect dish now!</p>
            </div>
            <img src={images.home} alt="" />
        </div>
        <Filters />
        <Pagination recipes={recipes} loading={loading}/>
        </>
    )
}

export default Home