
import { Link } from 'react-router-dom'
const Home = () => {
    return (
        <>
            <div className=""> Home 🐈‍⬛</div>

            <div>
                <Link to="/signup">
                    <button type="button" className="">
                        Register
                    </button>
                </Link>
                <Link to="/signin">
                    <button type="button" className="">
                        Login
                    </button>
                </Link>
                <Link to="/dashboard">
                    <button type="button" className="">
                        Dashboard
                    </button>
                </Link>
            </div>

        </>
    )
}
export default Home