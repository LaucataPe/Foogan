import { useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from "./SearchBar";
import { filterOrigin, filterDiets, orderBy, resetFilters } from "../redux/actions";

function Filters() {
    const [filters, setFilters] = useState({
        orderBy: 'title',
        way: '',
    })
    const dispatch = useDispatch()
    const diets = useSelector((state) => state.diets)

    const handleDiet = (event) =>{
        dispatch(filterDiets(event.target.value))
    }
    const handleOrigin = (event) =>{
        dispatch(filterOrigin(event.target.value))
    }
    const handleOrderBy = (event) =>{
        setFilters({...filters, orderBy: event.target.value})
    }
    const handleOrder = (event) =>{
        setFilters({...filters, way: event.target.value})
        dispatch(orderBy(filters.orderBy, event.target.value))
    }

    return (
        <>
        <h3>FILTERS AND SORTING</h3>
        <SearchBar/>

        <select name="diet" onChange={(e) => handleDiet(e)}>
            <option value="all">All</option>
            {diets.length > 0 && diets.map(diet => {
                return <option key={diet} value={diet}>{diet}</option>;
            })}
        </select>
        <select name="origin"  onChange={(e) => handleOrigin(e)}>
            <option value="All">All recipes</option>
            <option value="api">API</option>
            <option value="db">My recipes</option>
        </select>

        <p>Order By</p>
        <select name="order" onChange={(e) => handleOrderBy(e)} >
            <option value="title">Name</option>
            <option value="healthScore">Health Score</option>
        </select>
        <button value="A" onClick={(e) => handleOrder(e)}>Up</button>
        <button value="D" onClick={(e) => handleOrder(e)}>Down</button><br />

        <button onClick={() => dispatch(resetFilters())}>Reset</button>
        </>
    );
 }
 
 export default Filters;