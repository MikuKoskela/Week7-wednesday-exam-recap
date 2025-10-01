import {useState} from 'react'




const AddJobPage = () => {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("Electronics")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [stockQuantity, setStockQuantity] = useState("")
  const [supplierName, setSupplierName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [rating, setRating] = useState("")
  
  
  const createProduct = async() => {
    
    try{
      const response = await fetch('/api/products',
        {
        method:"POST",
        headers: {
           "Content-Type": "application/json"
         },
        body: JSON.stringify({
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
      })
        }); 
    if(!response.ok){throw new Error("Failed to fetch job");}
        const data = await response.json()
        console.log("User Created:",data)
    } catch(error){
      console.log(error)
 
  }
  }

  const submitForm = (e) => {
    e.preventDefault();
    createProduct()
   
  };

  return (
    <div className="create">
      <h2>Add a New Product</h2>
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
        <button type="submit" >Add Product</button>
      </form>
    </div>
  );
};

export default AddJobPage;
