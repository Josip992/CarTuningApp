import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";

import { Routes, Route } from "react-router-dom";

import { VehicleProvider } from "./contexts/VehicleContext";
import { AuthProvider } from "./contexts/AuthContext";

function App() {

  return (
    <AuthProvider>
    <VehicleProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/cart" element={<CartPage/>}/>
      </Routes>
    </VehicleProvider>
    </AuthProvider>
  );
}

export default App
