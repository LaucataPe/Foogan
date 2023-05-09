import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CardDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});

    useEffect(() =>{
        const getRecipe = async(id) =>{
            try {
                const response = await axios(`http://localhost:3001/food/recipe/${id}`);
                const data = await response.data;
                return setRecipe(data);
            } catch (error) {
                console.log(error)  
            }
        }
        getRecipe(id)
    },[id])



    console.log(recipe);
    return(
        <>
        <h1>Detail</h1>
        <span>#{recipe.id}</span>
        <h2>{recipe.title}</h2>
        <p>{recipe.summary}</p>
        <h5>{recipe.healthScore}</h5>
        {Object.keys(recipe).length > 0 ? recipe.diets.map((diet) => (
            <h3>{diet}</h3>
        )):''}
        {Object.keys(recipe).length > 0 ? 
            recipe.steps[0].steps.map((step) => (
            <h3>{step.number}{step.step}</h3>
        )):''}
        <img src={recipe.image} alt={recipe.title} />

        <Link to='/home'><button>Home</button></Link>
        </>
    )
}

export default CardDetail
