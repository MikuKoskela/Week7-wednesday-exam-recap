const Product = require("../models/productModel");
const mongoose = require("mongoose");

//GET / products;
const getAllProducts = async (req, res) => {  
  try{
  const products = await Product.find({}).sort({ createdAt: -1});
  res.status(200).json(products)
} catch (error){
    res.status(500).json({message: "Failed to retrieve products", error})
}

};

// POST /products
const createProduct = async (req, res) => {
  try{
    const product = await Product.create({...req.body});
    res.status(200).json(product)
  }
  catch (error){
    res.status(500).json({message: "Failed to create product", error})
  }
};

// GET /products/:productId
const getProductById = async (req, res) => {
      const {productId} = req.params 
  if (!mongoose.Types.ObjectId.isValid(productId)){
    return res.status(400).json({message: "Invalid Product Id", error})
  }
  try{
    const product = await Product.findById(productId)
    if(product){
      res.status(200).json(product)
    } else {
      res.status(404).json({ message: "Product not found"})
    }
  }
  catch(error){
    res.satus(500).json({message: "Failed to retrieve job", error})
  }

};

// PUT /products/:productId
const updateProduct = async (req, res) => {
  const {productId} = req.params
  if (!mongoose.Types.ObjectId.isValid(productId)){
      return res.status(400).json({message: "Invalid Product Id"})
  }
  try{
    const updatedProduct = await Product.findOneAndUpdate(
      {_id: productId},
      {...req.body},
      {new: true}
    );
    if(updatedProduct){
      res.status(200).json(updatedProduct)
    } else{
      res.status(404).json({message: "Product not found"})
    }
  } catch (error) {
    res.status(500).json({message: "failed to update product", error})
  }

};

// DELETE /products/:productId
const deleteProduct = async (req, res) => {
  const {productId} = req.params
  if (!mongoose.Types.ObjectId.isValid(productId))
    return res.status(400).json({message: "invalid product id"})
  try{
    const deletedProduct = await Product.findOneAndDelete({_id:productId})
 if (deletedProduct){
    res.status(200).json({message: "Product deleted successfully:", productId})
  }else{
    res.status(404).json({message: "Product not found"})
  }
  } catch(error){
    res.status(500).json("Failed to delete job", error)
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
