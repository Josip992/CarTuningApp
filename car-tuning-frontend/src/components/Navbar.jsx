import { Link } from "react-router-dom";
import "../css/Navbar.css"
import "../css/VehicleListForm.css"
import { useAuthContext } from "../contexts/AuthContext";

function Navbar(){
    const { user, logout } = useAuthContext();

    return (
        <nav className="navbar">
            <div>
                <Link to="/" className="navbar-brand"><img src="/images/logo/logo.jpg" alt="Car Tuning Logo" className="navbar-logo" /></Link>
            </div>
            {user ? (
                <div>
                <button 
                onClick={logout}
                className="button-navbar"
                >Logout</button>
            </div>
            ):(
            <div className="navbar-links">
            <div>
                <Link to="/login" className="nav-link">Login </Link>
            </div>
            <div>
                <Link to="/register" className="nav-link">Register </Link>
            </div>
            </div>    
            )
            }
        </nav>
    );
}

export default Navbar