import { useEffect, useState } from "react";
import { fetchVehicles, fetchMakes, fetchModels, fetchTypes, fetchEngines } from "../api/vehicleService";
import { useVehicleContext } from "../contexts/VehicleContext";

function VehicleListForm() {
    const {selectedMake, setSelectedMake, selectedModel, setSelectedModel,
       selectedType, setSelectedType, selectedEngine, setSelectedEngine } = useVehicleContext();
    const [vehicles, setVehicles] = useState([]);

    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [types, setTypes] = useState([]);
    const [engines, setEngines] = useState([]);

    

    const [error, setError] = useState(null);

    const changeVehicle = () => {
        setSelectedMake("");
        setSelectedModel("");
        setSelectedType("");
        setSelectedEngine("");
    };

    useEffect(()=>{
        const loadVehicles = async () => {
            try{
                const vehicleList = await fetchVehicles();
                setVehicles(vehicleList);
            }catch(err){
                console.log(err);
                setError(err);
            }  
        } 
        loadVehicles();
    },[]);

    useEffect(()=>{
        const loadMakes = async () => {
            try{
                const makesList = await fetchMakes();
                setMakes(makesList);
            }catch(err){
                console.log(err);
                setError(err); 
            }
        }
        loadMakes();
    }, []);

    useEffect(()=>{
        const loadModels = async () => {
            if(!selectedMake){
                 return;
            };
            try{
                const modelsList = await fetchModels(selectedMake);
                setModels(modelsList);
           }catch(err){
                console.log(err);
                setError(err);
            }
        }
        loadModels();
    }, [selectedMake]);

    useEffect(()=>{
        const loadTypes = async () => {
            if(!selectedModel){
                 return;
            };
            try{
                const typeList = await fetchTypes(selectedModel);
                setTypes(typeList);
           }catch(err){
                console.log(err);
                setError(err);
            }
        }
        loadTypes();
    }, [selectedModel]);

    
    useEffect(()=>{
        const loadEngines = async () => {
            if(!selectedType){
                 return;
            };
            try{
                const engineList = await fetchEngines(selectedType);
                setEngines(engineList);
           }catch(err){
                console.log(err);
                setError(err);
            }
        }
        loadEngines();
    }, [selectedType]);

    useEffect(()=>{
        const loadModels = async () => {
            if(!selectedModel){
                 return;
            };
            try{
                const typeList = await fetchTypes(selectedModel);
                setTypes(typeList);
           }catch(err){
                console.log(err);
                setError(err);
            }
        }
        loadModels();
    }, [selectedType]);

    return(
        <div>
    {selectedMake && selectedModel && selectedType && selectedEngine ? (
      <div>
        <h3>You selected:</h3>
        <p><strong>Make:</strong> {selectedMake}</p>
        <p><strong>Model:</strong> {selectedModel}</p>
        <p><strong>Type:</strong> {selectedType}</p>
        <p><strong>Engine:</strong> {selectedEngine}</p>
        <button
        onClick={changeVehicle}
        >Change vehicle
        </button>
      </div>
    ) : (
      <div>
        <div>
          <label>MAKE </label>
          <select
            value={selectedMake}
            onChange={(e) => {
              setSelectedMake(e.target.value);
              setSelectedModel("");
            }}
          >
            <option value="">Select make</option>
            {makes.map((make, index) => (
              <option key={index} value={make}>
                {make}
              </option>
            ))}
          </select>
        </div>

        {selectedMake && (
          <div>
            <label>MODEL </label>
            <select
              value={selectedModel}
              onChange={(e) => {
                setSelectedModel(e.target.value);
                setSelectedType("");
              }}
            >
              <option value="">Select model</option>
              {models.map((model, index) => (
                <option key={index} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedModel && (
          <div>
            <label>TYPE </label>
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setSelectedEngine("");
              }}
            >
              <option value="">Select type</option>
              {types.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedType && (
          <div>
            <label>ENGINE </label>
            <select
              value={selectedEngine}
              onChange={(e) => {
                setSelectedEngine(e.target.value);
              }}
            >
              <option value="">Select engine</option>
              {engines.map((engine, index) => (
                <option key={index} value={engine}>
                  {engine}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    )}
  </div> 
    );
}

export default VehicleListForm;