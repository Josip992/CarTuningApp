import { Link } from "react-router-dom";
import "../css/Navbar.css"
import { useAuthContext } from "../contexts/AuthContext";

function Navbar(){
    const { user, logout} = useAuthContext();

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="navbar-brand">Car Tuning</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Homepage </Link>
            </div>
            {user ? (
                <div className="navbar-links">
                <button onClick={logout}>LOGOUT</button>
            </div>
            ):(
            <div>
            <div className="navbar-links">
                <Link to="/login" className="nav-link">Login </Link>
            </div>
            <div className="navbar-links">
            <Link to="/register" className="nav-link">Register </Link>
            </div>
            </div>    
            )
            }
        </nav>
    );
}

export default Navbar