import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const Suppliers = () => {
  const [showForm, setShowForm] = useState(false);

  const [supplierName, setSupplierName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("Active");

  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  // =========================
  // Fetch Suppliers
  // =========================
  const fetchSuppliers = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:3000/api/supplier",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "pos-token"
            )}`,
          },
        }
      );

      if (response.data.success) {
        setSuppliers(response.data.suppliers);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  // =========================
  // Add Supplier
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     let response;

if (editId) {
  response = await axios.put(
    `http://localhost:3000/api/supplier/${editId}`,
    {
      supplierName,
      contactPerson,
      email,
      phone,
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "pos-token"
        )}`,
      },
    }
  );

  alert("Supplier Updated Successfully");
  setEditId(null);
} else {
  response = await axios.post(
    "http://localhost:3000/api/supplier/add",
    {
      supplierName,
      contactPerson,
      email,
      phone,
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "pos-token"
        )}`,
      },
    }
  );

  alert("Supplier Added Successfully");
}

      if (response.data.success) {
        alert("Supplier Added Successfully");

        setSupplierName("");
        setContactPerson("");
        setEmail("");
        setPhone("");
        setStatus("Active");

        setShowForm(false);

        fetchSuppliers();
      }
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to add supplier"
      );
    }
  };

  // =========================
  // Delete Supplier
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this supplier?"
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/supplier/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "pos-token"
            )}`,
          },
        }
      );

      if (response.data.success) {
        alert("Supplier Deleted");
        fetchSuppliers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handle Edit-----------------------------------------

  const handleEdit = (supplier) => {
  setSupplierName(supplier.supplierName);
  setContactPerson(supplier.contactPerson);
  setEmail(supplier.email);
  setPhone(supplier.phone);
  setStatus(supplier.status);

  setEditId(supplier._id);

  setShowForm(true);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

  if (loading) {
    return (
      <div className="text-center text-xl mt-10">
        Loading...
      </div>
    );
  }

  //  search tab working----------------------------

  const filteredSuppliers = suppliers.filter(
  (supplier) =>
    supplier.supplierName
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    supplier.contactPerson
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    supplier.email
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
);
return (

  <div className="min-h-screen bg-slate-100 p-4 md:p-6">

```
{/* Header */}
<div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg mb-6">

  <div className="flex flex-col md:flex-row justify-between items-center gap-4">

    <div>
      <h1 className="text-3xl md:text-4xl font-bold">
        Suppliers Management
      </h1>

      <p className="text-purple-100 mt-2">
        Manage suppliers and vendor information
      </p>
    </div>

    <button
      onClick={() => setShowForm(true)}
      className="bg-white text-purple-600 hover:bg-gray-100 px-5 py-3 rounded-xl font-semibold flex items-center gap-2"
    >
      <FaPlus />
      Add Supplier
    </button>

  </div>

</div>

{/* Statistics Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">

  <div className="bg-white rounded-2xl shadow-lg p-5">
    <p className="text-gray-500">
      Total Suppliers
    </p>

    <h2 className="text-4xl font-bold text-blue-600 mt-2">
      {suppliers.length}
    </h2>
  </div>

  <div className="bg-white rounded-2xl shadow-lg p-5">
    <p className="text-gray-500">
      Active Suppliers
    </p>

    <h2 className="text-4xl font-bold text-green-600 mt-2">
      {
        suppliers.filter(
          (s) => s.status === "Active"
        ).length
      }
    </h2>
  </div>

  <div className="bg-white rounded-2xl shadow-lg p-5">
    <p className="text-gray-500">
      Inactive Suppliers
    </p>

    <h2 className="text-4xl font-bold text-red-600 mt-2">
      {
        suppliers.filter(
          (s) => s.status === "Inactive"
        ).length
      }
    </h2>
  </div>

</div>

{/* Supplier Form */}
{showForm && (
  <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">

    <h2 className="text-2xl font-bold mb-6">
      {editId
        ? "Update Supplier"
        : "Add Supplier"}
    </h2>

    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >

      <input
        type="text"
        placeholder="Supplier Name"
        value={supplierName}
        onChange={(e) =>
          setSupplierName(e.target.value)
        }
        className="border border-gray-300 p-3 rounded-xl"
        required
      />

      <input
        type="text"
        placeholder="Contact Person"
        value={contactPerson}
        onChange={(e) =>
          setContactPerson(e.target.value)
        }
        className="border border-gray-300 p-3 rounded-xl"
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="border border-gray-300 p-3 rounded-xl"
        required
      />

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
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
        <option value="Active">
          Active
        </option>

        <option value="Inactive">
          Inactive
        </option>
      </select>

      <div className="flex gap-3">

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
        >
          {editId
            ? "Update Supplier"
            : "Save Supplier"}
        </button>

        <button
          type="button"
          onClick={() => {
            setShowForm(false);
            setEditId(null);
            setSupplierName("");
            setContactPerson("");
            setEmail("");
            setPhone("");
            setStatus("Active");
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
      placeholder="Search Suppliers..."
      value={searchTerm}
      onChange={(e) =>
        setSearchTerm(e.target.value)
      }
      className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
    />

  </div>

</div>

{/* Suppliers Table */}
<div className="bg-white rounded-3xl shadow-lg overflow-hidden">

  <div className="p-6 border-b">

    <h2 className="text-2xl font-bold">
      Suppliers List
    </h2>

  </div>

  <div className="overflow-x-auto">

    <table className="w-full">

      <thead className="bg-slate-100">

        <tr>
          <th className="px-6 py-4 text-left">#</th>
          <th className="px-6 py-4 text-left">
            Supplier Name
          </th>
          <th className="px-6 py-4 text-left">
            Contact Person
          </th>
          <th className="px-6 py-4 text-left">
            Email
          </th>
          <th className="px-6 py-4 text-left">
            Phone
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

        {filteredSuppliers.map(
          (supplier, index) => (

            <tr
              key={supplier._id}
              className="border-b hover:bg-slate-50 transition"
            >

              <td className="px-6 py-4">
                {index + 1}
              </td>

              <td className="px-6 py-4 font-semibold">
                {supplier.supplierName}
              </td>

              <td className="px-6 py-4">
                {supplier.contactPerson}
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <FaEnvelope />
                  {supplier.email}
                </div>
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <FaPhone />
                  {supplier.phone}
                </div>
              </td>

              <td className="px-6 py-4">

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    supplier.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {supplier.status}
                </span>

              </td>

              <td className="px-6 py-4">

                <div className="flex justify-center gap-2">

                  <button
                    onClick={() =>
                      handleEdit(supplier)
                    }
                    className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        supplier._id
                      )
                    }
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                  >
                    <FaTrash />
                  </button>

                </div>

              </td>

            </tr>

          )
        )}

      </tbody>

    </table>

  </div>

</div>
```

  </div>
);

};

export default Suppliers;