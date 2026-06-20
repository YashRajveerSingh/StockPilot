import React, {
  useState,
  useEffect,
} from "react";

import axios from "axios";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaEdit,
} from "react-icons/fa";

const Profile = () => {
const [profile, setProfile] =
  useState({});

const [showForm, setShowForm] =
  useState(false);

const [name, setName] =
  useState("");

const [email, setEmail] =
  useState("");

const [phone, setPhone] =
  useState("");

const [address, setAddress] =
  useState("");

const [company, setCompany] =
  useState("");

const [role, setRole] =
  useState("");

const [joinDate, setJoinDate] =
  useState("");

  useEffect(() => {
  fetchProfile();
}, []);

const fetchProfile = async () => {
  try {
  const response = await axios.get(
  "http://localhost:3000/api/profile",
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        "pos-token"
      )}`,
    },
  }
);

    if (response.data.success) {
      const data =
        response.data.profile;

      setProfile(data);

      setName(data?.name || "");
      setEmail(data?.email || "");
      setPhone(data?.phone || "");
      setAddress(
        data?.address || ""
      );
      setCompany(
        data?.company || ""
      );
      setRole(data?.role || "");
      setJoinDate(
        data?.joinDate || ""
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const handleSubmit = async (
  e
) => {
  e.preventDefault();

  try {
  const response = await axios.put(
  "http://localhost:3000/api/profile",
  {
    name,
    email,
    phone,
    address,
    company,
    role,
    joinDate,
  },
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
      fetchProfile();
      setShowForm(false);
    }
  } catch (error) {
    console.log(error);
  }
};

return (

  <div className="min-h-screen bg-slate-100 p-4 md:p-6">

```
{/* Header */}
<div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-lg mb-6">

  <div className="flex flex-col md:flex-row justify-between items-center gap-4">

    <div>
      <h1 className="text-3xl md:text-4xl font-bold">
        My Profile
      </h1>

      <p className="text-indigo-100 mt-2">
        Manage your account information and settings
      </p>
    </div>

    <button
      onClick={() => setShowForm(true)}
      className="bg-white text-indigo-700 hover:bg-gray-100 px-5 py-3 rounded-xl font-semibold flex items-center gap-2"
    >
      <FaEdit />
      Edit Profile
    </button>

  </div>

</div>

{/* Update Form */}
{showForm && (
  <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">

    <h2 className="text-2xl font-bold mb-6">
      Update Profile
    </h2>

    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >

      <input
        type="text"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        placeholder="Name"
        className="border border-gray-300 p-3 rounded-xl"
      />

      <input
        type="email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        placeholder="Email"
        className="border border-gray-300 p-3 rounded-xl"
      />

      <input
        type="text"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
        placeholder="Phone"
        className="border border-gray-300 p-3 rounded-xl"
      />

      <input
        type="text"
        value={address}
        onChange={(e) =>
          setAddress(e.target.value)
        }
        placeholder="Address"
        className="border border-gray-300 p-3 rounded-xl"
      />

      <input
        type="text"
        value={company}
        onChange={(e) =>
          setCompany(e.target.value)
        }
        placeholder="Company"
        className="border border-gray-300 p-3 rounded-xl"
      />

      <div className="flex gap-3">

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
        >
          Update Profile
        </button>

        <button
          type="button"
          onClick={() =>
            setShowForm(false)
          }
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl"
        >
          Cancel
        </button>

      </div>

    </form>

  </div>
)}

{/* Profile Card */}
<div className="bg-white rounded-3xl shadow-lg overflow-hidden">

  {/* Cover */}
  <div className="h-48 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>

  <div className="px-6 pb-6">

    {/* Avatar Section */}
    <div className="-mt-20 flex flex-col md:flex-row md:items-center md:justify-between">

      <div className="flex items-center gap-5">

        <div className="w-36 h-36 rounded-full bg-white shadow-xl border-4 border-white flex items-center justify-center">

          <FaUser className="text-6xl text-indigo-600" />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-gray-800">
            {profile?.name}
          </h2>

          <p className="text-indigo-600 font-semibold text-lg">
            {profile?.role}
          </p>

          <p className="text-gray-500">
            {profile?.company}
          </p>

        </div>

      </div>

    </div>

    {/* Information Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">

      <div className="bg-slate-50 rounded-2xl p-5">

        <div className="flex items-center gap-3">

          <FaEnvelope className="text-blue-600 text-xl" />

          <div>
            <p className="text-gray-500 text-sm">
              Email
            </p>

            <p className="font-semibold">
              {profile?.email}
            </p>
          </div>

        </div>

      </div>

      <div className="bg-slate-50 rounded-2xl p-5">

        <div className="flex items-center gap-3">

          <FaPhone className="text-green-600 text-xl" />

          <div>
            <p className="text-gray-500 text-sm">
              Phone
            </p>

            <p className="font-semibold">
              {profile?.phone}
            </p>
          </div>

        </div>

      </div>

      <div className="bg-slate-50 rounded-2xl p-5">

        <div className="flex items-center gap-3">

          <FaMapMarkerAlt className="text-red-600 text-xl" />

          <div>
            <p className="text-gray-500 text-sm">
              Address
            </p>

            <p className="font-semibold">
              {profile?.address}
            </p>
          </div>

        </div>

      </div>

      <div className="bg-slate-50 rounded-2xl p-5">

        <div className="flex items-center gap-3">

          <FaBriefcase className="text-purple-600 text-xl" />

          <div>
            <p className="text-gray-500 text-sm">
              Company
            </p>

            <p className="font-semibold">
              {profile?.company}
            </p>
          </div>

        </div>

      </div>

    </div>

    {/* Account Information */}
    <div className="mt-8 bg-white border rounded-3xl p-6">

      <h3 className="text-2xl font-bold mb-5">
        Account Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <p className="text-gray-500">
            Full Name
          </p>

          <p className="font-semibold">
            {profile?.name}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Role
          </p>

          <p className="font-semibold">
            {profile?.role}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Email
          </p>

          <p className="font-semibold">
            {profile?.email}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Join Date
          </p>

          <p className="font-semibold">
            {profile?.joinDate}
          </p>
        </div>

      </div>

    </div>

    {/* Statistics */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">

      <div className="bg-blue-50 rounded-2xl p-6">

        <h4 className="text-gray-600">
          Total Orders
        </h4>

        <p className="text-4xl font-bold text-blue-600 mt-2">
          156
        </p>

      </div>

      <div className="bg-green-50 rounded-2xl p-6">

        <h4 className="text-gray-600">
          Products Managed
        </h4>

        <p className="text-4xl font-bold text-green-600 mt-2">
          340
        </p>

      </div>

      <div className="bg-purple-50 rounded-2xl p-6">

        <h4 className="text-gray-600">
          Suppliers
        </h4>

        <p className="text-4xl font-bold text-purple-600 mt-2">
          28
        </p>

      </div>

    </div>

  </div>

</div>
```

  </div>
);

};

export default Profile;