import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const token = localStorage.getItem("token");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Email dan Password harus diisi.");
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });

      if (!data) {
        setIsLoading(false);
        return alert("email atau password salah");
      }
      alert("login berhasil");

      localStorage.setItem("user", data.rows.role);
      localStorage.setItem("token", data.token);
      setIsLogin(true);
      navigate(0);
      return;
    } catch (err) {
      setIsLoading(false);
      setError("Terjadi kesalahan, silakan coba lagi.");
    } finally {
      return;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-950 w-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-950 mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="text-sm text-red-500 bg-red-100 p-2 rounded">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-indigo-950 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-indigo-950 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-indigo-950 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              isLoading && "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? "Memproses..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          Belum punya akun?{" "}
          <a
            href="/register"
            className="text-indigo-500 hover:underline focus:outline-none"
          >
            Daftar di sini
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
