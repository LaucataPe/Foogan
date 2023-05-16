//import SearchBar from "./SearchBar"
import { Link } from "react-router-dom";
//import { useLocation } from 'react-router-dom';

function Nav({ setShowFilters }) {
    //const {pathname} = useLocation();

    function handleFiltersClick() {
      setShowFilters((showFilters) => !showFilters);
    } 

    return (
      <nav>
            <Link to='/home'><img src='#' alt="Logo Food" /></Link>
            <button onClick={handleFiltersClick}>Filters</button>       
            <Link to='/create'><button>Create Recipe!</button></Link>
      </nav>
    );
 }
 
 export default Nav;