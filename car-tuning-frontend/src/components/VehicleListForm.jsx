import { useEffect, useState } from "react";
import { fetchVehicles, fetchMakes, fetchModels, fetchTypes, fetchEngines } from "../api/vehicleService";
import { useVehicleContext } from "../contexts/VehicleContext";
import "../css/VehicleListForm.css";

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


    return(
        <div>
           {selectedMake && selectedModel && selectedType && selectedEngine ? (
             <div className="form-row vehicle-summary">
                <div>
                    Selected vehicle:
                </div>
             <div>
               {selectedMake} {selectedType} {selectedEngine}
             </div>
             <div className="input-group submit-group">
               <button onClick={changeVehicle}>Change vehicle</button>
             </div>
           </div>
           
    ) : (
    <form className="form-row">
        <div className="input-group">
        <label htmlFor="make">Make</label>
        <select
                    id="make"
                    name="make"
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
        
           <div className="input-group">
             <label htmlFor="model"
             className={selectedMake ? "" : "label-disabled"}
             >Model </label>
             <select
                id="model"
                name="model"
                value={selectedModel}
                onChange={(e) => {
                 setSelectedModel(e.target.value);
                 setSelectedType("");
               }}
               disabled={!selectedMake}
             >
               <option value="">Select model</option>
               {models.map((model, index) => (
                 <option key={index} value={model}>
                   {model}
                 </option>
               ))}
             </select>
           </div>
         
                <div className="input-group">
                    <label htmlFor="type"
                    className={selectedModel ? "" : "label-disabled"}
                    >Type </label>
                    <select
                    id="type"
                    name="type"
                    value={selectedType}
                    onChange={(e) => {
                        setSelectedType(e.target.value);
                        setSelectedEngine("");
                    }}
                    disabled={!selectedModel}
                    >
                    <option value="">Select type</option>
                    {types.map((type, index) => (
                        <option key={index} value={type}>
                        {type}
                        </option>
                    ))}
                    </select>
                </div>

                             <div className="input-group">
                               <label htmlFor="engine"
                               className={selectedType ? "" : "label-disabled"}
                               >Engine </label>
                               <select
                                 id="engine"
                                 name="engine"
                                 value={selectedEngine}
                                 onChange={(e) => {
                                   setSelectedEngine(e.target.value);
                                 }}
                                 disabled={!selectedType}
                               >
                                 <option value="">Select engine</option>
                                 {engines.map((engine, index) => (
                                   <option key={index} value={engine}>
                                     {engine}
                                   </option>
                                 ))}
                               </select>
                             </div>

            <div className="input-group submit-group">
            <button onClick={changeVehicle}>Reset</button>
            </div>      
    </form>
    )}
    </div>

);
}


export default VehicleListForm;