import { useEffect, useState } from "react";
import { fetchProducts } from "../api/productService";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

        useEffect(() => {
            const displayProducts = async () => {
                try{
                    const productList = await fetchProducts();
                    setProducts(productList);
                }catch(err){
                    console.log(err);
                    setError("Failed to load products");
                }finally{
                    setLoading(false);
                }
            }            
            displayProducts();
        },[])

        return (
        <div>
            {error && <div>{error}</div>}
            <h2>Products: </h2>
            {loading ? (<h2>Loading content</h2>) :
            (
            products.length === 0 ?
            (
                <p>No products found</p>
            ) : 
            (
                products.map((product,index) => (
                    <p key={index}>{product.name}</p>
                ))
            )
            )
            }
        </div>
        );
}

export default ProductList;