import VehicleListForm from "../components/VehicleListForm"
import ProductList from "../components/ProductList"
import VehicleSpecificProduct from "../components/VehicleSpecificProducts";
import { useVehicleContext } from "../contexts/VehicleContext";

function Homepage(){
    const {selectedMake, selectedModel,
        selectedType, selectedEngine } = useVehicleContext();
    const selectedVehicle = selectedMake && selectedModel && selectedType && selectedEngine;
    return (
        <div>
            <VehicleListForm/>
            {selectedVehicle && <VehicleSpecificProduct/>}
        </div>
    );
};

export default Homepage;