import Navbar from "./components/Navbar";

import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Cartpage from "./pages/Cartpage";


import { Routes, Route } from "react-router-dom";

import { VehicleProvider } from "./contexts/VehicleContext";
import { AuthProvider } from "./contexts/AuthContext";

function App() {

  return (
    <AuthProvider>
    <VehicleProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/cart" element={<Cartpage/>}/>
      </Routes>
    </VehicleProvider>
    </AuthProvider>
  );
}

export default App
