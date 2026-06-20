import Supplier from "../models/supplierModel.js";

const addSupplier = async (req, res) => {
  try {
    const supplier = new Supplier(req.body);

    await supplier.save();

    res.status(201).json({
      success: true,
      message: "Supplier Added Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();

    res.status(200).json({
      success: true,
      suppliers,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteSupplier = async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Supplier Deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateSupplier = async (req, res) => {
  const supplier = await Supplier.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json({
    success: true,
    supplier,
  });
};

export {
  addSupplier,
  getSuppliers,
  deleteSupplier,
  updateSupplier,
};