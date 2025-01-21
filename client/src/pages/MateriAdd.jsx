import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MateriAdd() {
  const [form, setForm] = useState({
    nama_materi: "",
    konten: "",
    program_id: 1,
  });
  const [programs, setPrograms] = useState([]); // Untuk daftar program
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/data/program"
        );
        setPrograms(data.program); // Pastikan format data API sesuai
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = await axios.post(
        "http://localhost:3000/api/data/materi",
        form,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      alert("Materi berhasil ditambahkan!");
      navigate("/Materi");
      return data;
    } catch (error) {
      console.error("Error adding materi:", error);
      alert("Gagal menambahkan materi. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate("/Materi");
  };

  return (
    <div className="p-6 bg-white shadow rounded-md max-w-lg mx-auto">
      {/* Tombol Kembali */}
      <div className="mb-4">
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 shadow"
        >
          Kembali
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        Tambah Materi
      </h2>
      <form onSubmit={handleFormSubmit}>
        {/* Input Nama Materi */}
        <div className="mb-4">
          <label
            htmlFor="nama_materi"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Nama Materi
          </label>
          <input
            type="text"
            id="nama_materi"
            name="nama_materi"
            value={form.nama_materi}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder="Masukkan nama materi"
          />
        </div>

        {/* Input Konten */}
        <div className="mb-4">
          <label
            htmlFor="konten"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Konten
          </label>
          <textarea
            id="konten"
            name="konten"
            value={form.konten}
            onChange={handleInputChange}
            required
            rows="4"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder="Masukkan konten materi"
          />
        </div>

        {/* Dropdown Program */}
        <div className="mb-4">
          <label
            htmlFor="program_id"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Pilih Program
          </label>
          <select
            id="program_id"
            name="program_id"
            value={form.program_id}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
          >
            <option value="" disabled>
              Pilih program
            </option>
            {programs?.map((program, index) => (
              <option key={index} value={program.id_program}>
                {program.nama_program}
              </option>
            ))}
          </select>
        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          className={`w-full py-2 px-4 text-white font-semibold rounded-md ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Menambahkan..." : "Tambah Materi"}
        </button>
      </form>
    </div>
  );
}
