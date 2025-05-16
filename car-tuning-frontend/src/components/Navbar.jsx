import { Link } from "react-router-dom";
import "../css/Navbar.css"
import "../css/VehicleListForm.css"
import { useAuthContext } from "../contexts/AuthContext";
import { logoutUser } from "../api/authService";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVehicleContext } from "../contexts/VehicleContext";


function Navbar(){
    const { user, logout } = useAuthContext();
    const { resetVehicle } = useVehicleContext();

    let navigate = useNavigate();

    const handleLogoutClick = async(e) => {
        e.preventDefault();
        try {
            const response = await logoutUser();
            logout();
            resetVehicle();
            navigate("/");
            alert(response.message);
        }catch (err) {
            console.error(err);
        }
    };

    return (
        <nav className="navbar">
            <div>
                <Link to="/" className="navbar-brand"><img src="/images/logo/logo.jpg" alt="Car Tuning Logo" className="navbar-logo" /></Link>
            </div>
            {user ? (
                    <div>
                        <div>
                            <Link to="/cart" className="nav-link">&#128722; </Link>
                        </div>    
                        <div>
                            <button 
                            onClick={handleLogoutClick}
                            className="button-navbar"
                            >Logout</button>
                        </div>
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