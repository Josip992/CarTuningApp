import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { loginUser } from "../api/authService";
import { useNavigate } from "react-router-dom";
import "../css/Auth.css"

function LoginPage(){
    const { login } = useAuthContext();

    const [ identifier, setIdentifier ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");
    const [ showPasssword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await loginUser(identifier, password);
            login(response.user, response.accessToken);
            navigate("/");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Login failed");
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
                    type={showPasssword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button
                type="button"
                className="hide-pass-btn"
                onClick={()=> setShowPassword((prev) => !prev)}>
                    {showPasssword ? "🫣":"👁️"}
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

