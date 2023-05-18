import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './CardDetail.module.css'
import images from '../../img/index'

function CardDetail() {
    const { id } = useParams();
    const {search} = useLocation();
    const [recipe, setRecipe] = useState({});

    useEffect(() =>{
        const getRecipe = async(id) =>{
            try {
                const response = await axios(`http://localhost:3001/food/recipe/${id}${search}`);
                const data = await response.data;
                return setRecipe(data);
            } catch (error) {
                console.log(error)  
                alert('The recipe does not exists')
            }
        }
        getRecipe(id)
    },[id])

    let stepsNumber = 0;

    return(
        <>
        <h2 className={styles.title}>{recipe.title}</h2>
        <h5 className={styles.healthScore}> <img src={images.star} alt="Star"/> {recipe.healthScore}</h5>
        <div className={styles.container}>
            <div className={styles.text}>
                <h3>Recipe Summary:</h3>
                <div dangerouslySetInnerHTML={{ __html: recipe.summary }} className={styles.summary}/>
                <h3>Steps:</h3>
                <div className={styles.steps}>
                    {recipe.steps ? recipe.steps[0].steps.map((step) => (
                        <p key={step.number}> <span className={styles.number}>{step.number}</span> {step.step}</p>
                        )):''}
                    {recipe.stepsdb ? recipe.stepsdb.map((step) => {
                        stepsNumber++;
                        return <p key={stepsNumber}><span className={styles.number}>{stepsNumber}</span> {step}</p>
                        }):''} 
                </div>
                
            </div>

            <div className={styles.image}> 
                <span className={styles.id}>#{recipe.id}</span>
                <img src={recipe.image} alt={recipe.title} />
                <div className={styles.diets}>
                <h3>Diets:</h3>
                {recipe.diets ? recipe.diets.map((diet) => (
                    <div key={diet} className={styles.diet}>{diet}</div>
                    )):''}
            </div> 
            </div>  
            
        </div>
        <Link to='/home'><button className={styles.back}>{'<'} Back</button></Link>
        </>
    )
}

export default CardDetail
