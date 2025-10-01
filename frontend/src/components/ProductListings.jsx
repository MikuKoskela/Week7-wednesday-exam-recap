import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

const ProductListings = () => {
  const [products, setProducts] = useState([])
  
  useEffect(()=>{
  const getProducts = async() => {
    try{
      const response = await fetch('/api/products');
    if (!response.ok) throw new Error("Failed to fetch products");
    const data = await response.json();
    console.log(data)
    setProducts(data)
    }catch(error){
      console.log('Failed to fetch products', error)
    }
  }
  getProducts();
  },[]);
  

  const deleteProduct = async(id) => {
    try {

    const response = await fetch(`/api/products/${id}`,{
      method:"DELETE",
    });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to delete product:", errorText);
        return;
      }
      console.log("Deleted product with id:", id)
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id))
    }catch(error){
      console.log("Error deleting products",error)
    }
  }

  return (
    <div className="job-list">
      <h1>Products: </h1>
      {products.map((product) => (
        <div className="job-preview" key={product._id}>
            <Link to={`/products/${product._id}`}>
              <h2>{product.title}</h2>
            </Link>
            <p>Type: {product.type}</p>
            <p>Company: {product.supplier?.name}</p>
            <button onClick={() => deleteProduct(product._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ProductListings;
