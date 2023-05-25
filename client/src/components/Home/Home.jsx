import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllRecipes } from "../../redux/actions";
import styles from './Home.module.css'
import images from '../../img/index'

/*Vistas*/
import Pagination from './Pagination'
import Filters from '../Filters/Filters'

function Home() {
    const recipes = useSelector((state) => state.recipes)
    const allRecipes = useSelector((state) => state.allRecipes)
    const recipesErrors = useSelector((state) => state.errors)
    const dispatch = useDispatch();

    useEffect(() => {
        if(allRecipes.length === 0)dispatch(getAllRecipes())
    }, [])

       console.log(recipesErrors);
    return(
        <>
        <div className={styles.home}>
            <div className={styles.info}>
                <h1 className={styles.title}>Look for your <span>favourite</span> recipes!</h1>
                <p>Discover delicious recipes for every taste and dietary preference. Find your perfect dish now!</p>
            </div>
            <img src={images.home} alt="" />
        </div>
        {recipesErrors.diets ? <div className={styles.error}>Sorry! {recipesErrors.diets} in Diets</div> : ''}
        <Filters />
        {recipesErrors.recipes ? <div className={styles.error}>Sorry! {recipesErrors.recipes} in Recipes</div> : ''}
        <Pagination recipes={recipes}/>
        </>
    )
}

export default Home