//import SearchBar from "./SearchBar"
import { Link } from "react-router-dom";
//import { useLocation } from 'react-router-dom';

function Nav() {

    return (
      <nav>
            <Link to='/home'><img src='#' alt="Logo Food" /></Link>    
            <Link to='/create'><button>Create Recipe!</button></Link>
      </nav>
    );
 }
 
 export default Nav;