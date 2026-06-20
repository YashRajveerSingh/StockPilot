import React, { useState, useEffect } from "react";
import axios from "axios";

const Categories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editId, setEditId] = useState(null);

  // ==========================
  // Fetch Categories
  // ==========================
  const fetchCategories = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:3000/api/category",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "pos-token"
            )}`,
          },
        }
      );

      if (response.data.success) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ==========================
  // Add / Update Category
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (editId) {
        // Update Category

        response = await axios.put(
          `http://localhost:3000/api/category/${editId}`,
          {
            categoryName,
            categoryDescription,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "pos-token"
              )}`,
            },
          }
        );

        alert("Category Updated Successfully");
      } else {
        // Add Category

        response = await axios.post(
          "http://localhost:3000/api/category/add",
          {
            categoryName,
            categoryDescription,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "pos-token"
              )}`,
            },
          }
        );

        alert("Category Added Successfully");
      }

      if (response.data.success) {
        setCategoryName("");
        setCategoryDescription("");
        setEditId(null);

        fetchCategories();
      }
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // ==========================
  // Edit Category
  // ==========================
const handleEdit = (category) => {
  console.log("Edit Clicked:", category);

  setCategoryName(category.categoryName);
  setCategoryDescription(
    category.categoryDescription
  );

  setEditId(category._id);
};

  // ==========================
  // Delete Category
  // ==========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "pos-token"
            )}`,
          },
        }
      );

      if (response.data.success) {
        alert("Category Deleted");
        fetchCategories();
      }
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  // ==========================
  // Loading
  // ==========================
  if (loading) {
    return (
      <div className="text-center mt-10 text-xl">
        Loading...
      </div>
    );
  }
return (
  <div className="min-h-screen bg-slate-100 p-4 md:p-6">

    {/* Header */}
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg mb-6">

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        <div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Categories Management
          </h1>

          <p className="text-blue-100 mt-2">
            Manage your product categories efficiently
          </p>
        </div>

        <div className="bg-white/20 px-5 py-3 rounded-2xl backdrop-blur-sm">
          <p className="text-sm">
            Total Categories
          </p>

          <h2 className="text-3xl font-bold">
            {categories.length}
          </h2>
        </div>

      </div>

    </div>

    {/* Main Content */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Form Section */}
      <div className="lg:col-span-1">

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {editId
              ? "Update Category"
              : "Add New Category"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>
              <label className="block text-gray-600 mb-2">
                Category Name
              </label>

              <input
                type="text"
                placeholder="Enter category name"
                value={categoryName}
                onChange={(e) =>
                  setCategoryName(
                    e.target.value
                  )
                }
                required
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">
                Description
              </label>

              <textarea
                rows="5"
                placeholder="Enter category description"
                value={categoryDescription}
                onChange={(e) =>
                  setCategoryDescription(
                    e.target.value
                  )
                }
                required
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold transition"
            >
              {editId
                ? "Update Category"
                : "Add Category"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setCategoryName("");
                  setCategoryDescription("");
                }}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold"
              >
                Cancel Edit
              </button>
            )}

          </form>

        </div>

      </div>

      {/* Category List */}
      <div className="lg:col-span-2">

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold text-gray-800">
              Categories List
            </h2>

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              {categories.length} Records
            </span>

          </div>

          {categories.length === 0 ? (
            <div className="text-center py-10">

              <h3 className="text-xl font-semibold text-gray-700">
                No Categories Found
              </h3>

              <p className="text-gray-500 mt-2">
                Add your first category to get started.
              </p>

            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="bg-slate-100">

                    <th className="p-4 text-left">
                      #
                    </th>

                    <th className="p-4 text-left">
                      Category Name
                    </th>

                    <th className="p-4 text-left">
                      Description
                    </th>

                    <th className="p-4 text-center">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {categories.map(
                    (category, index) => (
                      <tr
                        key={category._id}
                        className="border-b hover:bg-slate-50 transition"
                      >

                        <td className="p-4">
                          {index + 1}
                        </td>

                        <td className="p-4 font-semibold text-gray-700">
                          {
                            category.categoryName
                          }
                        </td>

                        <td className="p-4 text-gray-500">
                          {
                            category.categoryDescription
                          }
                        </td>

                        <td className="p-4">

                          <div className="flex justify-center gap-2">

                            <button
                              onClick={() =>
                                handleEdit(
                                  category
                                )
                              }
                              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(
                                  category._id
                                )
                              }
                              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                            >
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>

    </div>

  </div>
);
};

export default Categories;