import VehicleListForm from "../components/VehicleListForm"
import VehicleSpecificProduct from "../components/VehicleSpecificProducts";
import { useVehicleContext } from "../contexts/VehicleContext";

function Homepage(){
    console.log("Rendering homepage");
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