import { useEffect, useState } from "react";
import {fetchCompatibleProducts} from "../api/productService"
import { useVehicleContext } from "../contexts/VehicleContext";

function VehicleSpecificProducts() {
    const {selectedType} = useVehicleContext();
    const [compatibleProducts, setCompatibleProducts] = useState([]);

    useEffect(()=>{
        const loadCompatibleProducts = async () => {
            const compatibleProductsList = await fetchCompatibleProducts(selectedType);
            setCompatibleProducts(compatibleProductsList);
        };
        loadCompatibleProducts();
    }, []);

    console.log(compatibleProducts);

    return (
        <div>
            {compatibleProducts.map((product, index) => (
                <div key={index}>
                    <h3>{product.name}</h3>
                    <p>Category: {product.category}</p>
                    <p>Price: {product.price}</p>
                </div>
            ))}
        </div>
    );
}

export default VehicleSpecificProducts;