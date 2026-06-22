import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaTruck,
  FaRupeeSign,
} from "react-icons/fa";

const DashboardHome = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSuppliers: 0,
    revenue: 0,
  });

  const [lowStockProducts, setLowStockProducts] = useState([]);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/dashboard",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "pos-token"
            )}`,
          },
        }
      );

      if (response.data.success) {
        setStats(response.data.stats);

        setLowStockProducts(
          response.data.lowStockProducts || []
        );
      }
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const cards = [
    {
      title: "Users",
      value: stats.totalUsers,
      icon: <FaUsers />,
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Products",
      value: stats.totalProducts,
      icon: <FaBoxOpen />,
      color: "from-green-500 to-green-700",
    },
    {
      title: "Orders",
      value: stats.totalOrders,
      icon: <FaShoppingCart />,
      color: "from-orange-500 to-orange-700",
    },
    {
      title: "Suppliers",
      value: stats.totalSuppliers,
      icon: <FaTruck />,
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "Revenue",
      value: `₹${stats.revenue.toLocaleString()}`,
      icon: <FaRupeeSign />,
      color: "from-red-500 to-red-700",
    },
  ];

  const maxValue = Math.max(
    stats.totalProducts,
    stats.totalOrders,
    stats.totalSuppliers,
    1
  );

  const productPercent = Math.round(
    (stats.totalProducts / maxValue) * 100
  );

  const orderPercent = Math.round(
    (stats.totalOrders / maxValue) * 100
  );

  const supplierPercent = Math.round(
    (stats.totalSuppliers / maxValue) * 100
  );

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Welcome back 👋 Manage your inventory efficiently
          </p>
        </div>

        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg">
          Generate Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 mb-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`bg-gradient-to-r ${card.color}
            text-white rounded-3xl p-6 shadow-lg
            hover:scale-105 hover:shadow-2xl
            transition-all duration-300`}
          >
            <div className="flex justify-between">
              <div>
                <p className="text-sm opacity-80">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {card.value}
                </h2>
              </div>

              <div className="text-5xl opacity-80">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2">
          <div className="bg-white rounded-3xl shadow-lg p-6 h-full">
            <h2 className="text-2xl font-bold mb-4">
              Inventory Analytics
            </h2>

            <p className="text-gray-500">
              Monitor products, suppliers, orders,
              and inventory performance from one place.
            </p>
          </div>
        </div>

        <div className="space-y-6">

          {/* Quick Actions */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              Quick Actions
            </h2>

            <div className="grid grid-cols-2 gap-3">

              <button
                onClick={() =>
                  navigate("/admin-dashboard/products")
                }
                className="bg-blue-600 text-white p-3 rounded-xl"
              >
                Product
              </button>

              <button
                onClick={() =>
                  navigate("/admin-dashboard/suppliers")
                }
                className="bg-green-600 text-white p-3 rounded-xl"
              >
                Supplier
              </button>

              <button
                onClick={() =>
                  navigate("/admin-dashboard/orders")
                }
                className="bg-orange-600 text-white p-3 rounded-xl"
              >
                Order
              </button>

              <button
                onClick={() =>
                  navigate("/admin-dashboard/categories")
                }
                className="bg-purple-600 text-white p-3 rounded-xl"
              >
                Category
              </button>

            </div>
          </div>

          {/* Inventory Overview */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-5">
              Inventory Overview
            </h2>

            <div className="space-y-5">

              <div>
                <div className="flex justify-between">
                  <span>
                    Products ({stats.totalProducts})
                  </span>

                  <span>{productPercent}%</span>
                </div>

                <div className="w-full h-3 bg-gray-200 rounded-full mt-2">
                  <div
                    className="h-3 bg-green-500 rounded-full"
                    style={{
                      width: `${productPercent}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <span>
                    Orders ({stats.totalOrders})
                  </span>

                  <span>{orderPercent}%</span>
                </div>

                <div className="w-full h-3 bg-gray-200 rounded-full mt-2">
                  <div
                    className="h-3 bg-blue-500 rounded-full"
                    style={{
                      width: `${orderPercent}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <span>
                    Suppliers ({stats.totalSuppliers})
                  </span>

                  <span>{supplierPercent}%</span>
                </div>

                <div className="w-full h-3 bg-gray-200 rounded-full mt-2">
                  <div
                    className="h-3 bg-purple-500 rounded-full"
                    style={{
                      width: `${supplierPercent}%`,
                    }}
                  ></div>
                </div>
              </div>

            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-red-50 border border-red-200 rounded-3xl p-6">
            <h2 className="text-red-600 font-bold text-xl">
              Low Stock Alert
            </h2>

            <div className="space-y-3 mt-4">

              {lowStockProducts.length > 0 ? (
                lowStockProducts.map((product) => (
                  <div
                    key={product._id}
                    className="flex justify-between"
                  >
                    <span>
                      {product.productName}
                    </span>

                    <span className="text-red-500 font-semibold">
                      {product.quantity} Left
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No low stock products.
                </p>
              )}

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default DashboardHome;