import { Link } from 'react-router-dom';
import axios from 'axios'
import { getAllRecipes } from "../../redux/actions";
import { useDispatch } from 'react-redux'
import styles from './Card.module.css'
import images from '../../img/index'

function Card({recipes}) {
    const dispatch = useDispatch();
    
    const handleConfirm = async(id) =>{
        if(prompt('If you really want to delete this recipe answer: YES') === 'YES'){
            try {
                await axios.delete(`http://localhost:3001/food/delete/${id}`);
                dispatch(getAllRecipes())
                return alert('The recipe was deleted')
            } catch (error) {
                console.log(error)  
                alert(error.response.data)
            }
        } 
    }
    console.log(recipes);
    return(
        <div className={styles.container}>
        {recipes.map( recipe =>(
            <>
            
            <div className={styles.card}>
                <Link to={recipe.database ? `/detail/${recipe.id}?database=true` : `/detail/${recipe.id}`}>
                    <img src={recipe.image.url} alt={recipe.title}  className={styles.recipeImage}/>
                </Link>
                <div key={recipe.id} className={styles.cardText}>
                
                    <h3 className={styles.recipeTitle}>{recipe.title}</h3>
                    <div className={styles.score}>{recipe.healthScore}</div>
                    {recipe.database ? <button onClick={() => handleConfirm(recipe.id)} className={styles.delete}>X</button> : ''}
                    {recipe.database ? <Link to={`/update/${recipe.id}`}><img src={images.edit} alt="Edit" className={styles.edit}/></Link> : ''}
                </div>   
                <div className={styles.diets}>
                    {recipe.diets.map(diet => <p className={styles.diet}>{diet}</p>)}
                </div>         
            </div> 
             

            </>
        ))}
        </div>
    )
}

export default Card