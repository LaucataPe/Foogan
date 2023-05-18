import { Link } from 'react-router-dom';
import axios from 'axios'
import { getAllRecipes } from "../../redux/actions";
import { useDispatch } from 'react-redux'
import styles from './Card.module.css'

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

    return(
        <div className={styles.container}>
        {recipes.map( recipe =>(
            <>
            <div key={recipe.id} className={styles.card}>
                <img src={recipe.image} alt={recipe.title}/>
                {recipe.database ? <Link to={`/detail/${recipe.id}?database=true`}><h3>{recipe.title}</h3></Link> : 
                <Link to={`/detail/${recipe.id}`}><h3>{recipe.title}</h3></Link>}
                <div className={styles.score}>{recipe.healthScore}</div>
                {recipe.database ? <button onClick={() => handleConfirm(recipe.id)} className={styles.delete}>X</button> : ''}
                {recipe.database ? <Link to={`/update/${recipe.id}`}><button className={styles.edit}>🖋</button></Link> : ''}
            </div>
            
            </>
        ))}
        </div>
    )
}

export default Card