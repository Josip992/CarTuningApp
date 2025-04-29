import { useContext } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { loginUser } from "../api/authService";

function LoginPage(){
    const { login } = useAuthContext();

    const handleSubmit = async(req,res) => {
        e.preventDefault();
        try{
            const res = loginUser(username, email, password);
            login(res.data.user, res.data.token);
        }catch(err){
            console.log(err);
        }
    }
    
    return (
        <></>
    );
};