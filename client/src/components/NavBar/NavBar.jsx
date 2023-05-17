import styles from './NavBar.module.css'
import { Link } from "react-router-dom";
//import { useLocation } from 'react-router-dom';

function Nav() {

    return (
      <nav>
            <Link to='/home'><img src='#' alt="Logo Food" className={styles.logo}/></Link>    
            <Link to='/create'><button className={styles.create}>Create Recipe!</button></Link>
      </nav>
    );
 }
 
 export default Nav;