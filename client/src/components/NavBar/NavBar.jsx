import styles from './NavBar.module.css'
import { Link } from "react-router-dom";
import images from '../../img/index'
//import { useLocation } from 'react-router-dom';

function Nav() {

    return (
      <nav>
            <Link to='/'><img src={images.logo} alt="Logo Foogan" className={styles.logo}/></Link>    
            <Link to='/create'><button className={styles.create}>Create Recipe!</button></Link>
      </nav>
    );
 }
 
 export default Nav;