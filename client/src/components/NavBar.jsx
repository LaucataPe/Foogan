//import SearchBar from "./SearchBar"
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function Nav() {
    const {pathname} = useLocation();
    return (
      <nav>
            <Link to='/home'><img src='#' alt="Logo Food" /></Link>
            {pathname !== '/home/filters' ?
            <Link to='/home/filters'><button>Filter Recipes</button></Link> :
            <Link to='/home'><button>Close Filters</button></Link>}          
            <Link to='/create'><button>Create Recipe!</button></Link>
      </nav>
    );
 }
 
 export default Nav;