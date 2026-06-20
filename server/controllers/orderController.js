import Order from "../models/orderModel.js";

// Add Order
const addOrder = async (req, res) => {
  try {
    const {
      customerName,
      totalAmount,
      status,
    } = req.body;

    const order = new Order({
      customerName,
      totalAmount,
      status,
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order Added Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete Order
const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Order Deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update Order
const updateOrder = async (req, res) => {
  try {
    const order =
      await Order.findByIdAndUpdate(
        req.params.id,
        req.body,
       { returnDocument: "after" }
      );

    res.status(200).json({
      success: true,
      order,
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
  addOrder,
  getOrders,
  deleteOrder,
  updateOrder,
};