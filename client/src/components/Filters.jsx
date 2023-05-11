//import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import SearchBar from "./SearchBar";
import { filterOrigin, filterDiets } from "../redux/actions";

function Filters() {
    const [filters, setFilters] = useState({
        name: '',
        origin: '',
        diet: '',
    })
    const dispatch = useDispatch()

    const handleDiet = (event) =>{
        setFilters({...filters, diet: event.target.value})
        dispatch(filterDiets(event.target.value))
    }
    const handleOrigin = (event) =>{
        setFilters({...filters, origin: event.target.value})
        dispatch(filterOrigin(event.target.value))
    }

    const handleOrder = (event) =>{
        setFilters({...filters, alphabetic: event.target.value})
    }

    return (
        <>
        <h3>FILTERS AND SORTING</h3>
        <SearchBar/>

        <select name="diet" onChange={(e) => handleDiet(e)}>
            <option value="all">All diets</option>
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="ketogenic">Ketogenic</option>
        </select>
        <select name="origin"  onChange={(e) => handleOrigin(e)}>
            <option value="All">All recipes</option>
            <option value="api">API</option>
            <option value="db">My recipes</option>
        </select>

        <p>Order By</p>
        <select name="order" onChange={(e) => handleOrder(e)} >
            <option value="name">Name</option>
            <option value="score">Health Score</option>
        </select>
        <button>Up</button>
        <button>Down</button>
        </>
    );
 }
 
 export default Filters;