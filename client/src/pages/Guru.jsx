import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Guru() {
  const [data, setData] = useState([]); // Menyimpan data guru
  const [search, setSearch] = useState(""); // Menyimpan nilai pencarian
  const [currentPage, setCurrentPage] = useState(1); // Halaman aktif
  const [totalPages, setTotalPages] = useState(1); // Total halaman
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const navigate = useNavigate();
  const itemsPerPage = 5; // Jumlah item per halaman

  // Fetch data guru
  const fetchGuru = async (page = 1, searchQuery = "") => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/data/guru", {
        params: { page, limit: itemsPerPage, search: searchQuery },
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setData(response.data.guru); // Mengambil data guru dari response
      setTotalPages(response.data.pages); // Total halaman dari response
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  // Menghapus data guru
  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus guru ini?")) {
      try {
        await axios.delete(`http://localhost:3000/api/data/guru/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        fetchGuru(currentPage, search);
      } catch (error) {
        console.error("Error deleting guru:", error);
      }
    }
  };

  // Handle pencarian
  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetchGuru(1, e.target.value); // Mulai dari halaman 1 saat pencarian
  };

  // Handle perubahan halaman
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchGuru(page, search);
  };

  useEffect(() => {
    fetchGuru(currentPage, search);
  }, []);

  return (
    <div className="p-8 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Daftar Guru</h1>

      {/* Search Bar */}
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Cari guru..."
          value={search}
          onChange={handleSearch}
          className="w-full sm:w-1/2 px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
        />
      </div>

      {/* Table */}
      {isLoading ? (
        <p>Loading data...</p>
      ) : (
        <table className="w-full text-left bg-white shadow-md rounded-md border">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-gray-600">#</th>
              <th className="py-3 px-4 text-gray-600">Nama</th>
              <th className="py-3 px-4 text-gray-600">NIP</th>
              <th className="py-3 px-4 text-gray-600">Email</th>
              {localStorage.getItem("user") === "admin" ? (
                <th className="py-3 px-4 text-gray-600">Action</th>
              ) : (
                <th></th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((guru, index) => (
              <tr key={guru.id_guru} className="border-t">
                <td className="py-3 px-4">
                  {index + 1 + (currentPage - 1) * itemsPerPage}
                </td>
                <td className="py-3 px-4">{guru.nama_guru}</td>
                <td className="py-3 px-4">{guru.nip || "N/A"}</td>
                <td className="py-3 px-4">{guru.user.email}</td>
                <td className="py-3 px-4 flex space-x-2">
                  {localStorage.getItem("user") === "admin" ? (
                    <button
                      onClick={() => handleDelete(guru.user.id_user)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <nav>
          <ul className="flex space-x-2">
            {[...Array(totalPages).keys()].map((page) => (
              <li key={page}>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  className={`px-4 py-2 border rounded ${
                    currentPage === page + 1
                      ? "bg-indigo-500 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {page + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
