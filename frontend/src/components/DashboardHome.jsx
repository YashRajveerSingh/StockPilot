import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaTruck,
  FaRupeeSign,
  FaArrowUp,
  FaPlus,
  FaChartLine,
} from "react-icons/fa";

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSuppliers: 0,
    revenue: 0,
  });

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

              <p className="text-xs mt-2">
                +12% Growth
              </p>
            </div>

            <div className="text-5xl opacity-80">
              {card.icon}
            </div>
          </div>
        </div>
      ))}

    </div>

    {/* Main Content */}
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

      {/* Left Section */}
      <div className="xl:col-span-2 space-y-6">


        {/* Activities */}
        <div className="bg-white rounded-3xl shadow-lg p-6">

          <h2 className="text-xl font-bold mb-4">
            Recent Activities
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between border-b pb-3">
              <span>New Product Added</span>
              <span>5 min ago</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Order Completed</span>
              <span>20 min ago</span>
            </div>

            <div className="flex justify-between">
              <span>Supplier Updated</span>
              <span>1 hour ago</span>
            </div>

          </div>

        </div>

      </div>

      {/* Right Sidebar */}
      <div className="space-y-6">

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl shadow-lg p-6">

          <h2 className="text-xl font-bold mb-4">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 gap-3">

            <button className="bg-blue-600 text-white p-3 rounded-xl">
              Product
            </button>

            <button className="bg-green-600 text-white p-3 rounded-xl">
              Supplier
            </button>

            <button className="bg-orange-600 text-white p-3 rounded-xl">
              Order
            </button>

            <button className="bg-purple-600 text-white p-3 rounded-xl">
              Report
            </button>

          </div>

        </div>

        {/* Inventory Progress */}
        <div className="bg-white rounded-3xl shadow-lg p-6">

          <h2 className="text-xl font-bold mb-5">
            Inventory Overview
          </h2>

          <div className="space-y-5">

            <div>
              <div className="flex justify-between">
                <span>Products</span>
                <span>80%</span>
              </div>

              <div className="w-full h-3 bg-gray-200 rounded-full mt-2">
                <div className="w-4/5 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <span>Orders</span>
                <span>65%</span>
              </div>

              <div className="w-full h-3 bg-gray-200 rounded-full mt-2">
                <div className="w-2/3 h-3 bg-blue-500 rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <span>Suppliers</span>
                <span>90%</span>
              </div>

              <div className="w-full h-3 bg-gray-200 rounded-full mt-2">
                <div className="w-11/12 h-3 bg-purple-500 rounded-full"></div>
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

            <div className="flex justify-between">
              <span>Rice</span>
              <span className="text-red-500">
                5 Left
              </span>
            </div>

            <div className="flex justify-between">
              <span>Sugar</span>
              <span className="text-red-500">
                3 Left
              </span>
            </div>

            <div className="flex justify-between">
              <span>Oil</span>
              <span className="text-red-500">
                2 Left
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
);

};

export default DashboardHome;