import { useEffect, useState } from "react";
import {fetchCompatibleProducts} from "../api/productService"
import { useVehicleContext } from "../contexts/VehicleContext";
import "../css/VehicleListForm.css";

function VehicleSpecificProducts() {
    const {selectedType} = useVehicleContext();
    const [compatibleProducts, setCompatibleProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const categories = [...new Set(compatibleProducts.map(p => p.category))];
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(()=>{
        const loadCompatibleProducts = async () => {
            const compatibleProductsList = await fetchCompatibleProducts(selectedType);
            setCompatibleProducts(compatibleProductsList);
        };
        loadCompatibleProducts();
    }, []);

    return (
        <div>
            {!selectedCategory ? (
            <div className="category-list">
                
                {categories.map((category, idx) => (
                <div
                    key={idx}
                    className="vehicle-summary category-card"
                    onClick={() => setSelectedCategory(category)}
                    >
                    {!loaded && !error && (
                        <div className="image-loader">
                            <div className="spinner"></div>
                        </div>
                    )}
                    {error && (
                        <div className="image-error">❌</div>
                    )}
                    {!error && (
                        <div>
                        <img
                        src={`/images/${category}.jpg`}
                        className="category-image"
                        //style={{display: loaded ? "block": "none"}}
                        onLoad={()=>setLoaded(true)}
                        onError={()=>{
                            setError(true);
                            setLoaded(false);
                        }}
                        />
                        <div className="category-label">{category}</div>
                        </div>
                    )}
                </div>
                ))}

            </div>
            ) : (
            <div className="product-list">
                {compatibleProducts
                .filter(p => p.category === selectedCategory)
                .map((product, index) => (
                    <div key={index} className="vehicle-summary product-card">
                    <h3>{product.name}</h3>
                    <p>Price: ${product.price}</p>
                    </div>
                ))}
                <button onClick={() => setSelectedCategory(null)}>Categories</button>
            </div>
            )}
        </div>
    );
}

export default VehicleSpecificProducts;