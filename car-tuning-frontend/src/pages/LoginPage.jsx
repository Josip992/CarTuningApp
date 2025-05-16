import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { loginUser } from "../api/authService";
import { useNavigate } from "react-router-dom";
import { useVehicleContext } from "../contexts/VehicleContext";
import "../css/Auth.css"


function LoginPage(){
    const { login } = useAuthContext();
    const { resetVehicle } = useVehicleContext();

    const [ identifier, setIdentifier ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");
    const [ showPassword, setShowPassword] = useState(false);
    let navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await loginUser(identifier, password);
            login(response.user, response.accessToken);
            resetVehicle();
            navigate("/");
        } catch (err) {
            if (err.response) {
                setError(err.response.data?.message || "Login failed");
            } else {
                setError("Network error or no response from server.");
            }
        }
    };
    
    return (
        <div>
        <form onSubmit={handleSubmit}
            className="auth-form"
        >
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <input
                type="text"
                placeholder="Username or email"
                value={identifier}
                onChange={(e)=>setIdentifier(e.target.value)}
            />
            <div className="password-wrapper">
                <input 
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button
                type="button"
                className="hide-pass-btn"
                onClick={()=> setShowPassword((prev) => !prev)}>
                    {showPassword ? "🫣":"👁️"}
                </button>
            </div>
            <button 
            type="submit"
            className="button-default"
            >Login</button>   
        </form>
        </div>
    );
};

export default LoginPage;

