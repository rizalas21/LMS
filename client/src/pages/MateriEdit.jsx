import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function MateriEdit() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [form, setForm] = useState({
    nama_materi: "",
    konten: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/data/materi/${id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setData(response.data);
        setForm({
          nama_materi: response.data.nama_materi,
          konten: response.data.konten,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/data/materi/${id}`,
        form,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      alert("Data berhasil diperbarui!");
      navigate("/Materi");
      setData(response.data);
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Terjadi kesalahan saat memperbarui data.");
    }
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Edit Materi</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-md space-y-4"
      >
        <div>
          <label
            htmlFor="nama_materi"
            className="block text-sm font-medium text-gray-700"
          >
            Nama Materi
          </label>
          <input
            type="text"
            id="nama_materi"
            name="nama_materi"
            value={form.nama_materi}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="konten"
            className="block text-sm font-medium text-gray-700"
          >
            Konten
          </label>
          <textarea
            id="konten"
            name="konten"
            value={form.konten}
            onChange={handleChange}
            rows="5"
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
