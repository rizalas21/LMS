import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function MateriDetail() {
  const { id } = useParams(); // Mendapatkan ID dari URL params
  const navigate = useNavigate(); // Untuk navigasi antar halaman
  const [materi, setMateri] = useState(null); // Data materi
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch materi berdasarkan ID
    const fetchMateri = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/data/materi/${id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setMateri(response.data); // Simpan data materi
      } catch (error) {
        console.error("Error fetching materi:", error);
        alert("Gagal memuat data materi.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMateri();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus materi ini?"))
      return;

    try {
      await axios.delete(`http://localhost:3000/api/data/materi/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      alert("Materi berhasil dihapus.");
      navigate("/Materi");
    } catch (error) {
      console.error("Error deleting materi:", error);
      alert("Gagal menghapus materi.");
    }
  };

  const handleUpdate = () => {
    navigate(`/Materi/edit/${id}`); // Redirect ke halaman update materi
  };

  const handleBack = () => {
    navigate("/Materi"); // Kembali ke halaman daftar materi
  };

  if (isLoading) {
    return <p className="text-center">Memuat data...</p>;
  }

  if (!materi) {
    return <p className="text-center">Data materi tidak ditemukan.</p>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="w-9/12 bg-white shadow-md rounded-md p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4  border-b ">
          Detail Materi
        </h1>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            {materi.nama_materi}
          </h2>
        </div>
        <div className="mb-4">
          <p className="text-gray-600">{materi.konten}</p>
        </div>
        <div className="flex justify-between mt-6 w-full">
          <button
            onClick={handleBack}
            className="py-2 px-4 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          >
            Kembali
          </button>
          {localStorage.getItem("user") === "siswa" ? (
            ""
          ) : (
            <div className="space-x-4">
              <button
                onClick={handleUpdate}
                className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-blue-600"
              >
                Ubah
              </button>
              <button
                onClick={handleDelete}
                className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
