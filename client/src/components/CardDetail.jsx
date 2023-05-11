import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

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
        <h1>Detail</h1>
        <span>#{recipe.id}</span>
        <h2>{recipe.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
        <h5>{recipe.healthScore}</h5>
        {recipe.diets ? recipe.diets.map((diet) => (
            <h3 key={diet}>{diet}</h3>
        )):''}
        {recipe.steps ? recipe.steps[0].steps.map((step) => (
            <p key={step.number}>{step.number}. {step.step}</p>
        )):''}
         {recipe.stepsdb ? recipe.stepsdb.map((step) => {
            stepsNumber++;
            return <p key={stepsNumber}>{stepsNumber}. {step}</p>
         }):''} 
        <img src={recipe.image} alt={recipe.title} />

        <Link to='/home'><button>Home</button></Link>
        </>
    )
}

export default CardDetail
