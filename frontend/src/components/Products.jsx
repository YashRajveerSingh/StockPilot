import React,
{
  useState,
  useEffect,
} from "react";

import axios from "axios";



import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";

const Products = () => {
 
const [products, setProducts] =
  useState([]);

  const [showForm, setShowForm] = useState(false);

const [productName, setProductName] = useState("");
const [category, setCategory] = useState("");
const [price, setPrice] = useState("");
const [stock, setStock] = useState("");
const [status, setStatus] = useState("In Stock");

const [searchTerm, setSearchTerm] = useState("");

const [editId, setEditId] = useState(null);




const filteredProducts =
  products.filter(
    (product) =>
      product.productName
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        ) ||
      product.category
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
  );

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const productData = {
      productName,
      category,
      price,
      stock,
      status,
    };

    if (editId) {
      // UPDATE PRODUCT
      await axios.put(
        `http://localhost:3000/api/product/${editId}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "pos-token"
            )}`,
          },
        }
      );
    } else {
      // ADD PRODUCT
      await axios.post(
        "http://localhost:3000/api/product/add",
        productData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "pos-token"
            )}`,
          },
        }
      );
    }

    fetchProducts();

    setShowForm(false);
    setEditId(null);

    setProductName("");
    setCategory("");
    setPrice("");
    setStock("");
    setStatus("In Stock");

  } catch (error) {
    console.log(error.response?.data || error);
  }
};

const handleEdit = (product) => {
  setProductName(
  product.productName
);
  setCategory(product.category);
  setPrice(product.price);
  setStock(product.stock);
  setStatus(product.status);

  setEditId(product._id);
  setShowForm(true);
};

const handleDelete =
  async (id) => {
    if (
      !window.confirm(
        "Delete Product?"
      )
    )
      return;

    try {
      await axios.delete(
        `http://localhost:3000/api/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "pos-token"
            )}`,
          },
        }
      );

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };


useEffect(() => {
  fetchProducts();
}, []);

const fetchProducts =
  async () => {
    try {
      const response =
        await axios.get(
          "http://localhost:3000/api/product",
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
        setProducts(
          response.data.products
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

return (

  <div className="min-h-screen bg-slate-100 p-4 md:p-6">

```
{/* Header */}
<div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg mb-6">

  <div className="flex flex-col md:flex-row justify-between items-center gap-4">

    <div>
      <h1 className="text-3xl md:text-4xl font-bold">
        Products Management
      </h1>

      <p className="text-blue-100 mt-2">
        Manage inventory products efficiently
      </p>
    </div>

    <button
      onClick={() => setShowForm(true)}
      className="bg-white text-blue-600 hover:bg-gray-100 px-5 py-3 rounded-xl font-semibold flex items-center gap-2"
    >
      <FaPlus />
      Add Product
    </button>

  </div>

</div>

{/* Stats Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">

  <div className="bg-white rounded-2xl shadow-lg p-5">
    <p className="text-gray-500">
      Total Products
    </p>
    <h2 className="text-4xl font-bold text-blue-600 mt-2">
      {products.length}
    </h2>
  </div>

  <div className="bg-white rounded-2xl shadow-lg p-5">
    <p className="text-gray-500">
      In Stock
    </p>
    <h2 className="text-4xl font-bold text-green-600 mt-2">
      {
        products.filter(
          (p) => p.status === "In Stock"
        ).length
      }
    </h2>
  </div>

  <div className="bg-white rounded-2xl shadow-lg p-5">
    <p className="text-gray-500">
      Out Of Stock
    </p>
    <h2 className="text-4xl font-bold text-red-600 mt-2">
      {
        products.filter(
          (p) => p.status === "Out of Stock"
        ).length
      }
    </h2>
  </div>

</div>

{/* Product Form */}
{showForm && (
  <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">

    <h2 className="text-2xl font-bold mb-6">
      {editId
        ? "Update Product"
        : "Add Product"}
    </h2>

    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >

      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) =>
          setProductName(e.target.value)
        }
        className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
        className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) =>
          setPrice(e.target.value)
        }
        className="border border-gray-300 p-3 rounded-xl"
        required
      />

      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) =>
          setStock(e.target.value)
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
        <option>In Stock</option>
        <option>Out of Stock</option>
      </select>

      <div className="flex gap-3">

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
        >
          {editId
            ? "Update"
            : "Save"}
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
      placeholder="Search Products..."
      value={searchTerm}
      onChange={(e) =>
        setSearchTerm(e.target.value)
      }
      className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
    />

  </div>

</div>

{/* Products Table */}
<div className="bg-white rounded-3xl shadow-lg overflow-hidden">

  <div className="p-6 border-b">

    <h2 className="text-2xl font-bold">
      Products List
    </h2>

  </div>

  <div className="overflow-x-auto">

    <table className="w-full">

      <thead className="bg-slate-100">

        <tr>

          <th className="px-6 py-4 text-left">ID</th>
          <th className="px-6 py-4 text-left">Product</th>
          <th className="px-6 py-4 text-left">Category</th>
          <th className="px-6 py-4 text-left">Price</th>
          <th className="px-6 py-4 text-left">Stock</th>
          <th className="px-6 py-4 text-left">Status</th>
          <th className="px-6 py-4 text-center">Actions</th>

        </tr>

      </thead>

      <tbody>

        {filteredProducts.map((product) => (

          <tr
            key={product._id}
            className="border-b hover:bg-slate-50 transition"
          >

            <td className="px-6 py-4">
              PRD-{product._id.slice(-5)}
            </td>

            <td className="px-6 py-4 font-semibold">
              {product.productName}
            </td>

            <td className="px-6 py-4">
              {product.category}
            </td>

            <td className="px-6 py-4">
              ₹{product.price.toLocaleString()}
            </td>

            <td className="px-6 py-4">
              {product.stock}
            </td>

            <td className="px-6 py-4">

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  product.status === "In Stock"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {product.status}
              </span>

            </td>

            <td className="px-6 py-4">

              <div className="flex justify-center gap-2">

                <button
                  onClick={() =>
                    handleEdit(product)
                  }
                  className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() =>
                    handleDelete(product._id)
                  }
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
```

  </div>
);

};

export default Products;