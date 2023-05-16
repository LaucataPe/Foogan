import { Link } from 'react-router-dom';
import axios from 'axios'
import { getAllRecipes } from "../redux/actions";
import { useDispatch } from 'react-redux'

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
        <>
        {recipes.map( recipe =>(
            <div key={recipe.id}>
                <h3>{recipe.title}</h3>
                <img src={recipe.image} alt={recipe.title}/>
                {recipe.database ? <Link to={`/detail/${recipe.id}?database=true`}><button>+</button></Link> : 
                <Link to={`/detail/${recipe.id}`}><button>+</button></Link>
                }
                {recipe.database ? <button onClick={() => handleConfirm(recipe.id)}>X</button> : ''}
                {recipe.database ? <Link to={`/update/${recipe.id}`}><button>Edit</button></Link> : ''}
            </div>
        ))}
        </>
    )
}

export default Card