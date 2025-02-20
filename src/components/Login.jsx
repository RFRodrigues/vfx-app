import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [clientId, setClientId] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!clientId || !userId || password.length < 6) {
      setError("All fields are required and password must be at least 6 characters.");
      return;
    }

    setIsAuthenticated(true);
    navigate("/home");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <img
          src="/logo-color.svg"
          alt="VFX Financial Logo"
          className="w-auto h-12 mx-auto mb-6"
        />
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="CLIENT ID"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            placeholder="USER ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div class="flex justify-center">
            <button
              type="submit"
              class="w-1/2 bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition cursor-pointer"
            >
              Sign me in
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;
