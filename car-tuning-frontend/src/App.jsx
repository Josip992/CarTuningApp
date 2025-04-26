import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage"
import {Routes, Route} from "react-router-dom"
import { VehicleProvider } from "./contexts/VehicleContext";

function App() {

  return (
    <VehicleProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
      </Routes>
    </VehicleProvider>
  );
}

export default App
