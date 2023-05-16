import { Link } from 'react-router-dom';

function Landing() {
    return(
        <>
        <h1>This is the Landing Page</h1>
        <Link to='/home'><button>Home</button></Link>
        </>
    )
}

export default Landing