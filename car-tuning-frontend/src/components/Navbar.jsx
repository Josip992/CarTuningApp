import { Link } from "react-router-dom";
import "../css/Navbar.css"

function Navbar(){
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="navbar-brand">Car Tuning</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Homepage </Link>
            </div>
        </nav>
    )
}

export default Navbar