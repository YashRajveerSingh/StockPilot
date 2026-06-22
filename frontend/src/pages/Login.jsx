import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    console.log(
      "Sending Login Data:",
      {
        email,
        password,
      }
    );

    setLoading(true);
    setError("");

    try {
      const response =
        await axios.post(
          "http://localhost:3000/api/auth/login",
          {
            email,
            password,
          }
        );

      console.log(
        "Login Response:",
        response.data
      );

      if (
        response.data.success
      ) {
        login(
          response.data.user,
          response.data.token
        );

        const role =
           response.data.user.role.toLowerCase();

        if (
          role ===
          "admin"
        ) {
          navigate(
            "/admin-dashboard"
          );
        } else {
          navigate(
            "/customer/dashboard"
          );
        }
      }
    } catch (err) {
      console.log(
        "LOGIN ERROR:",
        err.response?.data
      );

      setError(
        err.response?.data
          ?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        <div className="bg-white rounded-3xl shadow-2xl p-8">

          <div className="text-center mb-8">

            <div className="w-16 h-16 mx-auto bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
             Y
            </div>

            <h1 className="mt-4 text-3xl font-bold text-gray-800">
              Welcome Admin
            </h1>

            <p className="text-gray-500 mt-2">
              Login to your StockPilot Dashboard
            </p>

          </div>

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-5"
          >

            <div>

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Email
              </label>

              <input
                type="email"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                required
                className="w-full px-4 py-3 border rounded-xl"
              />

            </div>

            <div>

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
                className="w-full px-4 py-3 border rounded-xl"
              />

            </div>

            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              {loading
                ? "Logging In..."
                : "Login"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Login;