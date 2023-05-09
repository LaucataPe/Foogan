import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import SearchBar from "./SearchBar";
//import { filterRecipes } from "../redux/actions";

function Filters() {
    const [filters, setFilters] = useState({
        name: '',
        origin: '',
        diet: '',
    })
    const dispatch = useDispatch()

    useEffect(()=>{
        //dispatch(filterRecipes(filters))
    }, [])

    const handleDiet = (event) =>{
        setFilters({...filters, diet: event.target.value})
    }
    const handleOrigin = (event) =>{
        setFilters({...filters, origin: event.target.value})
    }

    const handleOrderAlpha = (event) =>{
        setFilters({...filters, alphabetic: event.target.value})
    }
    const handleOrderNumber = (event) =>{
        setFilters({...filters, number: event.target.value})
    }
    return (
        <>
        <h3>FILTERS AND SORTING</h3>
        <SearchBar/>

        <select name="diet" onChange={(e) => handleDiet(e)}>
            <option value="all">All diets</option>
            <option value="vegan">Vegan</option>
            <option value="vegetarian">vegetarian</option>
            <option value="lol">lol</option>
        </select>
        <select name="origin"  onChange={(e) => handleOrigin(e)}>
            <option value="All">All recipes</option>
            <option value="api">API</option>
            <option value="db">My recipes</option>
        </select>

        <p>Order By</p>
        <select name="order"  onChange={max=lol}>
            <option value="name">Name</option>
            <option value="score">Health Score</option>
        </select>
        <button>Up</button>
        <button>Down</button>
        </>
    );
 }
 
 export default Filters;