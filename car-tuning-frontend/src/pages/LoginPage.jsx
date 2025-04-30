import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { loginUser } from "../api/authService";
import { useNavigate } from "react-router-dom";

function LoginPage(){
    const { login } = useAuthContext();

    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await loginUser(username, email, password);
            login(response.user, response.accessToken);
            navigate("/");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Login failed");
        }
    };
    
    return (
        <div>
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
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
            <button type="submit">Login</button>
        </form>
        </div>
    );
};

export default LoginPage;