import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Peserta() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const itemsPerPage = 5; // Number of items per page

  // Fetch peserta data
  const fetchPeserta = async (page = 1, searchQuery = "") => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/data/peserta",
        {
          params: { page, limit: itemsPerPage, search: searchQuery },
        }
      );
      setData(response.data.peserta); // Assuming the backend returns `peserta`
      setTotalPages(response.data.pages); // Assuming the backend returns `pages`
    } catch (error) {
      console.error("Error fetching peserta:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete peserta
  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus peserta ini?")) {
      try {
        await axios.delete(`http://localhost:3000/api/data/peserta/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        fetchPeserta(currentPage, search); // Refresh the data
      } catch (error) {
        console.error("Error deleting peserta:", error);
      }
    }
  };

  // Handle search
  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetchPeserta(1, e.target.value); // Start from page 1 on search
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchPeserta(page, search);
  };

  useEffect(() => {
    fetchPeserta(currentPage, search);
  }, []);

  return (
    <div className="p-8 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Daftar Peserta</h1>

      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Cari peserta..."
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
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-gray-600">#</th>
              <th className="py-3 px-4 text-gray-600">Nama</th>
              <th className="py-3 px-4 text-gray-600">NIS</th>
              <th className="py-3 px-4 text-gray-600">Email</th>
              <th className="py-3 px-4 text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((peserta, index) => (
              <tr key={peserta.id_siswa} className="border-t">
                <td className="py-3 px-4">
                  {index + 1 + (currentPage - 1) * itemsPerPage}
                </td>
                <td className="py-3 px-4">{peserta.nama_siswa}</td>
                <td className="py-3 px-4">{peserta.nis || "N/A"}</td>
                <td className="py-3 px-4">{peserta.user.email}</td>
                <td className="py-3 px-4 flex space-x-2">
                  <button
                    onClick={() => handleDelete(peserta.user.id_user)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
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
