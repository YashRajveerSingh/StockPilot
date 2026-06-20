import User from "../models/User.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import Supplier from "../models/supplierModel.js";

const getDashboardStats = async (
  req,
  res
) => {
  try {
    const totalUsers =
      await User.countDocuments();

    const totalProducts =
      await Product.countDocuments();

    const totalOrders =
      await Order.countDocuments();

    const totalSuppliers =
      await Supplier.countDocuments();

    const orders =
      await Order.find();

    const revenue =
      orders.reduce(
        (sum, order) =>
          sum + Number(order.amount || 0),
        0
      );

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalSuppliers,
        revenue,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export { getDashboardStats };