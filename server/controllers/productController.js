import Product from "../models/productModel.js";

// Add Product
const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Product Deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
       {
  returnDocument: "after",
}
      );

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
};