import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
    nama_siswa: "",
    nis: "",
    nama_guru: "",
    nip: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/api/register", {
        ...formData,
      });
      alert("Registrasi berhasil!");
      navigate("/Login");
      return data;
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Terjadi kesalahan.");
      } else {
        alert("Gagal menghubungi server.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-950 w-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-950 mb-6">
          Register
        </h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-indigo-950 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Masukkan email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-indigo-950 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Masukkan password"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-indigo-950 mb-2">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Pilih role</option>
              <option value="siswa">Siswa</option>
              <option value="guru">Guru</option>
            </select>
          </div>

          {/* Field khusus siswa */}
          {formData.role === "siswa" && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-indigo-950 mb-2">
                  Nama Siswa
                </label>
                <input
                  type="text"
                  name="nama_siswa"
                  value={formData.nama_siswa}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Masukkan nama siswa"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-indigo-950 mb-2">
                  NIS
                </label>
                <input
                  type="text"
                  name="nis"
                  value={formData.nis}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Masukkan NIS"
                  required
                />
              </div>
            </>
          )}

          {/* Field khusus guru */}
          {formData.role === "guru" && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-indigo-950 mb-2">
                  Nama Guru
                </label>
                <input
                  type="text"
                  name="nama_guru"
                  value={formData.nama_guru}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Masukkan nama guru"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-indigo-950 mb-2">
                  NIP
                </label>
                <input
                  type="text"
                  name="nip"
                  value={formData.nip}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Masukkan NIP"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-950 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          Sudah punya akun?{" "}
          <a
            href="/login"
            className="text-indigo-500 hover:underline focus:outline-none"
          >
            Login di sini
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
