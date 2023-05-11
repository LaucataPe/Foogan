import { Link } from 'react-router-dom';

function Card({recipes, loding}) {
    if(loding){
        return <h2>Loading...</h2>
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
            </div>
        ))}
        </>
    )
}

export default Card