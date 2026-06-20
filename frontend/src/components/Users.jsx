import React, {
  useState,
  useEffect,
} from "react";

import axios from "axios";

import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaUser,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const Users = () => {
 

  const [users, setUsers] = useState([]);

const [showForm, setShowForm] =
  useState(false);

const [editId, setEditId] =
  useState(null);

const [searchTerm, setSearchTerm] =
  useState("");

const [name, setName] = useState("");
const [email, setEmail] =
  useState("");
const [phone, setPhone] =
  useState("");

const [role, setRole] =
  useState("Staff");

const [status, setStatus] =
  useState("Active");


  const fetchUsers = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/user/",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "pos-token"
          )}`,
        },
      }
    );

    setUsers(response.data.users);
  } catch (error) {
    console.log(error);
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let response;

    const userData = {
      name,
      email,
      phone,
      role,
      status,
    };

    if (editId) {
      response = await axios.put(
        `http://localhost:3000/api/user/${editId}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "pos-token"
            )}`,
          },
        }
      );
    } else {
      response = await axios.post(
        "http://localhost:3000/api/user/add",
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "pos-token"
            )}`,
          },
        }
      );
    }

    if (response.data.success) {
      fetchUsers();

      setName("");
      setEmail("");
      setPhone("");
      setRole("Staff");
      setStatus("Active");

      setEditId(null);
      setShowForm(false);
    }
  } catch (error) {
    console.log(error);
  }
};



  const getRoleColor = (role) => {
    switch (role) {
      case "Admin":
        return "bg-purple-100 text-purple-700";
      case "Manager":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };



  const handleDelete = async (id) => {
  if (
    !window.confirm(
      "Delete this user?"
    )
  )
    return;

  try {
    const response =
      await axios.delete(
        `http://localhost:3000/api/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "pos-token"
            )}`,
          },
        }
      );

    if (response.data.success) {
      fetchUsers();
    }
  } catch (error) {
    console.log(error);
  }
};

const handleEdit = (user) => {
  setName(user.name);
  setEmail(user.email);
  setPhone(user.phone);
  setRole(user.role);
  setStatus(user.status);

  setEditId(user._id);

  setShowForm(true);
};


const filteredUsers = users.filter(
  (user) =>
    user.name
      ?.toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      ) ||
    user.email
      ?.toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      )
);

useEffect(() => {
  fetchUsers();
}, []);
return (

  <div className="min-h-screen bg-slate-100 p-4 md:p-6">

```
{/* Header */}
<div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-3xl p-6 text-white shadow-lg mb-6">

  <div className="flex flex-col md:flex-row justify-between items-center gap-4">

    <div>
      <h1 className="text-3xl md:text-4xl font-bold">
        Users Management
      </h1>

      <p className="text-cyan-100 mt-2">
        Manage system users and permissions
      </p>
    </div>

    <button
      onClick={() => setShowForm(true)}
      className="bg-white text-blue-700 hover:bg-gray-100 px-5 py-3 rounded-xl font-semibold flex items-center gap-2"
    >
      <FaPlus />
      Add User
    </button>

  </div>

</div>

{/* Statistics Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">

  <div className="bg-white rounded-2xl shadow-lg p-5">
    <p className="text-gray-500">
      Total Users
    </p>

    <h2 className="text-4xl font-bold text-blue-600 mt-2">
      {users.length}
    </h2>
  </div>

  <div className="bg-white rounded-2xl shadow-lg p-5">
    <p className="text-gray-500">
      Admins
    </p>

    <h2 className="text-4xl font-bold text-purple-600 mt-2">
      {
        users.filter(
          (u) => u.role === "Admin"
        ).length
      }
    </h2>
  </div>

  <div className="bg-white rounded-2xl shadow-lg p-5">
    <p className="text-gray-500">
      Managers
    </p>

    <h2 className="text-4xl font-bold text-cyan-600 mt-2">
      {
        users.filter(
          (u) => u.role === "Manager"
        ).length
      }
    </h2>
  </div>

  <div className="bg-white rounded-2xl shadow-lg p-5">
    <p className="text-gray-500">
      Active Users
    </p>

    <h2 className="text-4xl font-bold text-green-600 mt-2">
      {
        users.filter(
          (u) =>
            u.status === "Active"
        ).length
      }
    </h2>
  </div>

</div>

{/* Search */}
<div className="bg-white rounded-2xl shadow-lg p-4 mb-6">

  <div className="relative">

    <FaSearch className="absolute left-4 top-4 text-gray-400" />

    <input
      type="text"
      placeholder="Search Users..."
      value={searchTerm}
      onChange={(e) =>
        setSearchTerm(
          e.target.value
        )
      }
      className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
    />

  </div>

</div>

{/* User Form */}
{showForm && (
  <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">

    <h2 className="text-2xl font-bold mb-6">
      {editId
        ? "Update User"
        : "Add User"}
    </h2>

    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(
            e.target.value
          )
        }
        className="border border-gray-300 p-3 rounded-xl"
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
        className="border border-gray-300 p-3 rounded-xl"
        required
      />

      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) =>
          setPhone(
            e.target.value
          )
        }
        className="border border-gray-300 p-3 rounded-xl"
      />

      <select
        value={role}
        onChange={(e) =>
          setRole(
            e.target.value
          )
        }
        className="border border-gray-300 p-3 rounded-xl"
      >
        <option>Admin</option>
        <option>Manager</option>
        <option>Staff</option>
      </select>

      <select
        value={status}
        onChange={(e) =>
          setStatus(
            e.target.value
          )
        }
        className="border border-gray-300 p-3 rounded-xl"
      >
        <option>Active</option>
        <option>Inactive</option>
      </select>

      <div className="flex gap-3">

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
        >
          {editId
            ? "Update User"
            : "Save User"}
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

{/* Users Table */}
<div className="bg-white rounded-3xl shadow-lg overflow-hidden">

  <div className="p-6 border-b">

    <h2 className="text-2xl font-bold">
      Users List
    </h2>

  </div>

  <div className="overflow-x-auto">

    <table className="w-full">

      <thead className="bg-slate-100">

        <tr>
          <th className="px-6 py-4 text-left">
            ID
          </th>
          <th className="px-6 py-4 text-left">
            User
          </th>
          <th className="px-6 py-4 text-left">
            Email
          </th>
          <th className="px-6 py-4 text-left">
            Phone
          </th>
          <th className="px-6 py-4 text-left">
            Role
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

        {filteredUsers.map((user) => (

          <tr
            key={user._id}
            className="border-b hover:bg-slate-50 transition"
          >

            <td className="px-6 py-4">
              USR-{user._id?.slice(-5)}
            </td>

            <td className="px-6 py-4">

              <div className="flex items-center gap-3">

                <div className="bg-blue-100 p-3 rounded-full">

                  <FaUser className="text-blue-600" />

                </div>

                <span className="font-medium">
                  {user.name}
                </span>

              </div>

            </td>

            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <FaEnvelope />
                {user.email}
              </div>
            </td>

            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <FaPhone />
                {user.phone}
              </div>
            </td>

            <td className="px-6 py-4">

              <span
                className={`px-3 py-1 rounded-full text-sm ${getRoleColor(
                  user.role
                )}`}
              >
                {user.role}
              </span>

            </td>

            <td className="px-6 py-4">

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  user.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {user.status}
              </span>

            </td>

            <td className="px-6 py-4">

              <div className="flex justify-center gap-2">

                <button
                  onClick={() =>
                    handleEdit(user)
                  }
                  className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      user._id
                    )
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

export default Users;