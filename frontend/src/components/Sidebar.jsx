import React from "react";
import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaTable,
  FaBox,
  FaTruck,
  FaShoppingCart,
  FaUsers,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/admin-dashboard",isParent:true },
    { name: "Categories", icon: <FaTable />, path: "/admin-dashboard/categories",isParent:false },
    { name: "Products", icon: <FaBox />, path: "/admin-dashboard/products",isParent:false },
    { name: "Suppliers", icon: <FaTruck />, path: "/admin-dashboard/suppliers",isParent:false },
    { name: "Orders", icon: <FaShoppingCart />, path: "/admin-dashboard/orders",isParent:false },
    { name: "Users", icon: <FaUsers />, path: "/admin-dashboard/users",isParent:false },
    { name: "Profile", icon: <FaCog />, path: "/admin-dashboard/profile" ,isParent:false},
    { name: "Logout", icon: <FaSignOutAlt />, path: "/login",isParent:false },
  ];

  return (
    <div className="fixed left-0 top-0 flex flex-col h-screen w-16 md:w-64 bg-black text-white">

      {/* Logo Section */}
      <div className="flex items-center justify-center h-16 bg-gray-800">
        <span className="hidden md:block text-lg font-bold">
          Inventory MS
        </span>

        <span className="block md:hidden text-lg font-bold">
          IMS
        </span>
      </div>

      {/* Menu */}
      <div className="flex-1 mt-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
              end={item.isParent}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 transition-colors duration-200
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>

                <span className="hidden md:block ml-3">
                  {item.name}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default Sidebar;