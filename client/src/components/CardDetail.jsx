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
    })


    return(
        <>
        <h1>Detail</h1>
        <h2>{recipe.title}</h2>
        <Link to='/home'><button>Home</button></Link>
        </>
    )
}

export default CardDetail