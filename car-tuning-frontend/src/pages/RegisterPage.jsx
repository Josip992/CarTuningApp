import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { loginUser, registerUser } from "../api/authService";
import { useNavigate } from "react-router-dom";
import "../css/Auth.css"

function LoginPage(){
    const { register } = useAuthContext();

    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await registerUser(username, email, password);
            register(response.user, response.accessToken);
            navigate("/");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Register failed");
        }
    };
    
    return (
        <div>
        <form onSubmit={handleSubmit}
        className="auth-form"
        >
            <h2>Register</h2>
            {error && <p>{error}</p>}
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
            />
            <input 
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
            <input 
                type="text"
                placeholder="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />
            <button type="submit">Register</button>
        </form>
        </div>
    );
};

export default LoginPage;