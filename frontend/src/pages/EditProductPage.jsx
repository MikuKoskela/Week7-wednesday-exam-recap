import { useState, useEffect} from 'react';
import {useParams, useNavigate } from 'react-router-dom'


const EditProductPage = () => {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { id } = useParams()

    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [stockQuantity, setStockQuantity] = useState("")
    const [supplierName, setSupplierName] = useState("")
    const [contactEmail, setContactEmail] = useState("")
    const [contactPhone, setContactPhone] = useState("")
    const [rating, setRating] = useState("")
    
    const navigate = useNavigate();

    const updateProduct = async(product) => {
        try{
            const response = await fetch('/api/products',
                {
                    method:"PUT",
                    body: JSON.stringify(product)
                }
            )  
        if (!response.ok) {
      const errorText = await response.text(); 
      console.error("Failed to update product:", errorText);
      return response.ok;
        }
        const data = await response.json();
        console.log("Product updated succesfully", data)
    }catch (error) {
    console.error("Error while updating job:", error);
    return false;
}
    }
    useEffect(() => {
        const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setProduct(data);
        setTitle(data.title);
        setCategory(data.category);
        setDescription(data.description);
        setPrice(data.price);
        setStockQuantity(data.stockQuantity)
        setSupplierName(data.supplier.supplierName);
        setContactEmail(data.supplier.contactEmail);
        setContactPhone(data.supplier.contactPhone);
        setRating(data.rating)

      } catch (error) {
        console.error("Failed to fetch product:", error);
        setError(error.message);
      } finally {
        setLoading(false); 
      }
    };
       fetchProduct();
    },[id])

      const submitForm = async(e) => {
    e.preventDefault();

    const updatedProduct = {
        id,
        title,
        category,
        description,
        price,
        stockQuantity,
        supplier:{
            name: supplierName,
            contactEmail: contactEmail,
            contactPhone: contactPhone,
            rating
            }

    }

      const success = await updateProduct(updatedProduct);
    if (success) {
       toast.success("Product Updated Successfully");
      navigate(`/edit-product/${id}`);
    } else {
       toast.error("Failed to update the product");
    }
   
  };

  return (
      <div className="create">
      <h2>Edit Product</h2>
       {loading?(
            <p>Loading...</p>
        ):error ?(
            <p>{error}</p>
        ):(
      <form onSubmit={submitForm}>
        <label>Product title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e)=>setTitle(e.target.value)}

        />
        <label>Product Category:</label>
        <select value={category} onChange={(e)=>setCategory(e.target.value)}
>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Clothing">Clothing</option>
          <option value="Cosmetics">Cosmetics</option>
        </select>
        
        <label>Product Description:</label>
        <textarea
          required
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        ></textarea>

         <label>Price:</label>
        <input
          type="number"
          required
          value={price}
          onChange={(e)=>setPrice(e.target.value)}

        />
         <label>Stock Quantity:</label>
        <input
          type="number"
          required
          value={stockQuantity}
          onChange={(e)=>setStockQuantity(e.target.value)}

        />
        <label>Supplier Name:</label>
        <input
          type="text"
          required
          value={supplierName}
          onChange={(e)=>setSupplierName(e.target.value)}

        />
        <label>Contact Email:</label>
        <input
          type="text"
          required
          value={contactEmail}
          onChange={(e)=>setContactEmail(e.target.value)}

        />
        <label>Contact Phone:</label>
        <input
          type="text"
          required
          value={contactPhone}
          onChange={(e)=>setContactPhone(e.target.value)}
        />
          <label>Rating 1-5: </label>
        <input
          type="number"
          required
          value={rating}
          onChange={(e)=>setRating(e.target.value)}
        />
        <button type="submit" >Save Edit</button>   
      </form>
        )}
    </div>
  );
};

export default EditProductPage
