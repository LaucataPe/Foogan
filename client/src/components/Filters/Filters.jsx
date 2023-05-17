import { useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from "./SearchBar";
import { filterOrigin, filterDiets, orderBy, resetFilters } from "../../redux/actions";
import styles from './Filters.module.css'

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
        <div className={styles.container}>
            <div className={styles.filters}>
                <p>Filter by:</p>
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
                <SearchBar/>
                <button onClick={() => dispatch(resetFilters())} className={styles.reset}>🗑</button>
            </div>

            <div className={styles.orders}>
                <p>Order by:</p>
                <select name="order" onChange={(e) => handleOrderBy(e)} >
                    <option value="title">Name</option>
                    <option value="healthScore">Health Score</option>
                </select>
                <button value="A" onClick={(e) => handleOrder(e)} 
                className={filters.way === 'A' ? styles.active : styles.order}>Up</button>
                <button value="D" onClick={(e) => handleOrder(e)}
                className={filters.way === 'D' ? styles.active : styles.order}>Down</button>
            </div>

        </div>
    );
 }
 
 export default Filters;