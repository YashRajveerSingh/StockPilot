import React, {
  useState,
  useEffect,
} from "react";

import axios from "axios";


import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";


const Orders = () => {

   const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [customerName, setCustomerName] =
  useState("");

const [totalAmount, setTotalAmount] =
  useState("");

const [status, setStatus] =
  useState("Pending");

const [editId, setEditId] =
  useState(null);

 const [orders, setOrders] =
  useState([]);

const fetchOrders = async () => {
  try {
    const response =
      await axios.get(
        "http://localhost:3000/api/order",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "pos-token"
            )}`,
          },
        }
      );

    if (
      response.data.success
    ) {
      setOrders(
        response.data.orders
      );
    }
  } catch (error) {
    console.log(error);
  }
};

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleDelete =
  async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/order/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "pos-token"
            )}`,
          },
        }
      );

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

const filteredOrders =
  orders.filter(
    (order) =>
      order.customerName
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        ) ||
      order._id
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
  );


  const handleEdit = (order) => {
  setEditId(order._id);
  setCustomerName(order.customerName);
  setTotalAmount(order.totalAmount);
  setStatus(order.status);
  setShowForm(true);
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const orderData = {
      customerName,
      totalAmount,
      status,
    };

    if (editId) {
      await axios.put(
        `http://localhost:3000/api/order/${editId}`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "pos-token"
            )}`,
          },
        }
      );
    } else {
      await axios.post(
        "http://localhost:3000/api/order/add",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "pos-token"
            )}`,
          },
        }
      );
    }

    fetchOrders();

    setCustomerName("");
    setTotalAmount("");
    setStatus("Pending");
    setEditId(null);
    setShowForm(false);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchOrders();
}, []);

return (

  <div className="min-h-screen bg-slate-100 p-4 md:p-6">

```
{/* Header */}
<div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-6 text-white shadow-lg mb-6">

  <div className="flex flex-col md:flex-row justify-between items-center gap-4">

    <div>
      <h1 className="text-3xl md:text-4xl font-bold">
        Orders Management
      </h1>

      <p className="text-green-100 mt-2">
        Manage customer orders and deliveries
      </p>
    </div>

    <button
      onClick={() => {
        setEditId(null);
        setCustomerName("");
        setTotalAmount("");
        setStatus("Pending");
        setShowForm(true);
      }}
      className="bg-white text-green-700 hover:bg-gray-100 px-5 py-3 rounded-xl font-semibold"
    >
      Add Order
    </button>

  </div>

</div>

{/* Statistics Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">

  <div className="bg-white rounded-2xl shadow-lg p-5">
    <p className="text-gray-500">
      Total Orders
    </p>
    <h2 className="text-4xl font-bold text-blue-600 mt-2">
      {orders.length}
    </h2>
  </div>

  <div className="bg-white rounded-2xl shadow-lg p-5">
    <p className="text-gray-500">
      Delivered
    </p>
    <h2 className="text-4xl font-bold text-green-600 mt-2">
      {
        orders.filter(
          (o) => o.status === "Delivered"
        ).length
      }
    </h2>
  </div>

  <div className="bg-white rounded-2xl shadow-lg p-5">
    <p className="text-gray-500">
      Pending
    </p>
    <h2 className="text-4xl font-bold text-yellow-500 mt-2">
      {
        orders.filter(
          (o) => o.status === "Pending"
        ).length
      }
    </h2>
  </div>

  <div className="bg-white rounded-2xl shadow-lg p-5">
    <p className="text-gray-500">
      Cancelled
    </p>
    <h2 className="text-4xl font-bold text-red-600 mt-2">
      {
        orders.filter(
          (o) => o.status === "Cancelled"
        ).length
      }
    </h2>
  </div>

</div>

{/* Order Form */}
{showForm && (
  <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">

    <h2 className="text-2xl font-bold mb-6">
      {editId
        ? "Update Order"
        : "Add Order"}
    </h2>

    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >

      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) =>
          setCustomerName(e.target.value)
        }
        className="border border-gray-300 p-3 rounded-xl"
        required
      />

      <input
        type="number"
        placeholder="Total Amount"
        value={totalAmount}
        onChange={(e) =>
          setTotalAmount(e.target.value)
        }
        className="border border-gray-300 p-3 rounded-xl"
        required
      />

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        className="border border-gray-300 p-3 rounded-xl"
      >
        <option value="Pending">
          Pending
        </option>

        <option value="Delivered">
          Delivered
        </option>

        <option value="Cancelled">
          Cancelled
        </option>
      </select>

      <div className="flex gap-3">

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
        >
          {editId
            ? "Update Order"
            : "Save Order"}
        </button>

        <button
          type="button"
          onClick={() => {
            setShowForm(false);
            setEditId(null);
          }}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl"
        >
          Cancel
        </button>

      </div>

    </form>

  </div>
)}

{/* Search */}
<div className="bg-white rounded-2xl shadow-lg p-4 mb-6">

  <div className="relative">

    <FaSearch className="absolute left-4 top-4 text-gray-400" />

    <input
      type="text"
      placeholder="Search Orders..."
      value={searchTerm}
      onChange={(e) =>
        setSearchTerm(e.target.value)
      }
      className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
    />

  </div>

</div>

{/* Orders Table */}
<div className="bg-white rounded-3xl shadow-lg overflow-hidden">

  <div className="p-6 border-b">
    <h2 className="text-2xl font-bold">
      Orders List
    </h2>
  </div>

  <div className="overflow-x-auto">

    <table className="w-full">

      <thead className="bg-slate-100">

        <tr>
          <th className="px-6 py-4 text-left">
            Order ID
          </th>
          <th className="px-6 py-4 text-left">
            Customer
          </th>
          <th className="px-6 py-4 text-left">
            Date
          </th>
          <th className="px-6 py-4 text-left">
            Amount
          </th>
          <th className="px-6 py-4 text-left">
            Status
          </th>
          <th className="px-6 py-4 text-center">
            Actions
          </th>
        </tr>

      </thead>

      <tbody>

        {filteredOrders.map((order) => (

          <tr
            key={order._id}
            className="border-b hover:bg-slate-50 transition"
          >

            <td className="px-6 py-4 font-semibold">
              ORD-{order._id.slice(-6)}
            </td>

            <td className="px-6 py-4">
              {order.customerName}
            </td>

            <td className="px-6 py-4">
              {new Date(
                order.createdAt
              ).toLocaleDateString()}
            </td>

            <td className="px-6 py-4">
              ₹{order.totalAmount.toLocaleString()}
            </td>

            <td className="px-6 py-4">

              <span
                className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>

            </td>

            <td className="px-6 py-4">

              <div className="flex justify-center gap-2">

                <button
                  onClick={() =>
                    setSelectedOrder(order)
                  }
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
                >
                  <FaEye />
                </button>

                <button
                  onClick={() =>
                    handleEdit(order)
                  }
                  className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Delete this order?"
                      )
                    ) {
                      handleDelete(
                        order._id
                      );
                    }
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                >
                  <FaTrash />
                </button>

              </div>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>

{/* Order Details Modal */}
{selectedOrder && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-xl">

      <h2 className="text-2xl font-bold mb-4">
        Order Details
      </h2>

      <div className="space-y-3">

        <p>
          <strong>Order ID:</strong>{" "}
          {selectedOrder._id}
        </p>

        <p>
          <strong>Customer:</strong>{" "}
          {selectedOrder.customerName}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {new Date(
            selectedOrder.createdAt
          ).toLocaleDateString()}
        </p>

        <p>
          <strong>Amount:</strong> ₹
          {selectedOrder.totalAmount.toLocaleString()}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {selectedOrder.status}
        </p>

      </div>

      <button
        onClick={() =>
          setSelectedOrder(null)
        }
        className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl"
      >
        Close
      </button>

    </div>

  </div>
)}
```

  </div>
);

};



export default Orders;