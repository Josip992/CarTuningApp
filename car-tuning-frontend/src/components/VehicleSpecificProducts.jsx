import { useEffect, useState } from "react";
import {fetchCompatibleProducts} from "../api/productService"
import { useVehicleContext } from "../contexts/VehicleContext";
import "../css/VehicleListForm.css";

function VehicleSpecificProducts() {
    const {selectedType} = useVehicleContext();
    const [compatibleProducts, setCompatibleProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const categories = [...new Set(compatibleProducts.map(p => p.category))];

    useEffect(()=>{
        const loadCompatibleProducts = async () => {
            const compatibleProductsList = await fetchCompatibleProducts(selectedType);
            setCompatibleProducts(compatibleProductsList);
        };
        loadCompatibleProducts();
    }, []);

    const formatFileName = (name) =>
        name.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');

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
                        <div>
                        <img
                        src={`/images/categories/${category}.jpg`}
                        className="category-image"
                        />
                        <div className="category-label">{category}</div>
                        </div>
                </div>
                ))}
            </div>
            ) : (
            <div className="product-list">
                {compatibleProducts
                .filter(p => p.category === selectedCategory)
                .map((product, index) => (
                    <div
                     key={index}
                    className="vehicle-summary category-card">
                    <div>
                        <img
                        src={`/images/products/${formatFileName(product.name)}.jpg`}
                        className="category-image"
                        />
                        <div className="product-label">
                            {product.name}
                        <p>Price: ${product.price}</p>
                        </div>
                        </div>
                    </div>
                ))}
                <button onClick={() => setSelectedCategory(null)}>Categories</button>
            </div>
            )}
        </div>
    );
}

export default VehicleSpecificProducts;