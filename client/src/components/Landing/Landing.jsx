import { Link } from 'react-router-dom';
import styles from './Landing.module.css'
import images from '../../img/index'

function Landing() {
    return(
        <div className={styles.back}>
        {/* <img src={images.landing} alt='Landing Photo' /> */}
        <div className={styles.text}>
            <img src={images.logo} alt='Landing Photo' />
            <h1>All <span>Healthy recipes </span>in one place</h1>
            <p>Explore our recipe hub for a culinary journey filled with 
            diverse flavors and inspiring dishes. Elevate your cooking game 
            with detailed recipes and create unforgettable culinary experiences. </p>
            <Link to='/home'><button className={styles.button}>Start Cooking</button></Link>
        </div>
        </div>
    )
}

export default Landing